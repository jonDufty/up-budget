package handler

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/jmoiron/sqlx"
	"github.com/jonDufty/budget/libs/database"
	"github.com/jonDufty/budget/libs/database/models"
	"github.com/jonDufty/budget/libs/database/query"
	upclient "github.com/jonDufty/budget/libs/upbank/client"
)

type TransactionClient struct {
	Upbank *upclient.UpbankClient
	DB     *sql.DB
	DBX    *sqlx.DB
}

type Config struct {
	UpBank   upclient.UpbankConfig   `envconfig:"upbank"`
	Database database.DatabaseConfig `envconfig:"database"`
}

func NewTransactionClient(cfg Config) *TransactionClient {
	client := upclient.NewUpbankClient(cfg.UpBank)

	db, err := database.Connect(cfg.Database, map[string]string{"parseTime": "true"})
	if err != nil {
		log.Fatalf("db connection failed. %v", err)
	}

	dbx, err := database.ConnectX(cfg.Database, map[string]string{"parseTime": "true"})
	if err != nil {
		log.Fatalf("db connection failed. %v", err)
	}

	return &TransactionClient{
		Upbank: client,
		DB:     db,
		DBX:    dbx,
	}
}

func (c *TransactionClient) MustPing() {
	err := c.Upbank.TestPing()
	if err != nil {
		log.Fatalf("Failed to connect to API. %v", err)
	}

	err = database.TestPing(c.DB)
	if err != nil {
		log.Fatalf("Failed to connect to DB. %v", err)
	}

	err = database.TestPingX(c.DBX)
	if err != nil {
		log.Fatalf("Failed to connect to DBX. %v", err)
	}
}

func (c *TransactionClient) TransactionHandler(ctx context.Context, event events.CloudWatchEvent) error {
	timeFrom := c.getTimeFrom(ctx)
	c.Upbank.Settings.TimeFrom = timeFrom
	if timeFrom != nil {
		log.Println("Fetching transactions from", timeFrom)
	}

	transactions, err := c.Upbank.GetTransactions(ctx)
	if err != nil {
		return fmt.Errorf("get transactions failed: %w", err)
	}

	err = c.insertTransactions(ctx, transactions)
	if err != nil {
		return err
	}

	return nil
}

func (c *TransactionClient) BackfillTransactionHandler(ctx context.Context, event events.APIGatewayProxyRequest) error {

	timeUntil := getBackfillFromQuery(event.QueryStringParameters)
	c.Upbank.Settings.TimeUntil = &timeUntil
	c.Upbank.Settings.TimeFrom = &upclient.BackfillDate

	log.Printf("Fetching transactions from %s to %s", upclient.BackfillDate, timeUntil)

	transactions, err := c.Upbank.GetTransactions(ctx)
	if err != nil {
		return fmt.Errorf("get transactions failed: %w", err)
	}

	err = c.insertTransactions(ctx, transactions)
	if err != nil {
		return err
	}

	log.Println("Backfill Complete!!")

	return nil
}

func (c *TransactionClient) insertTransactions(ctx context.Context, transactions []upclient.TransactionResource) error {
	var failed error = nil

	for _, t := range transactions {
		if c.Upbank.IsInternalTransfer(t) {
			log.Printf("Merchant: %s. Internal transfer... skipping\n", t.Attributes.Description)
			continue
		}
		trans := models.NewTransactionFromApi(t)
		err := query.InsertIgnoreTransaction(ctx, c.DB, trans.Id, trans.Amount, trans.AccountId, trans.CreatedAt, trans.Merchant)
		if err != nil {
			failed = fmt.Errorf("transaction %s failed. %v. %w", trans.Id, err, failed)
		}

		merchant := models.NewMerchantFromApi(t)
		err = c.addTransactionMerchant(ctx, merchant)
		if err != nil {
			failed = fmt.Errorf("%v. %w", err, failed)
		}
	}

	return failed
}

func (c *TransactionClient) addTransactionMerchant(ctx context.Context, merchant *models.Merchant) error {
	exists, err := query.MerchantExists(ctx, c.DBX, merchant.Name)

	if err != nil {
		return fmt.Errorf("error looking up merchant table. %w", err)
	}

	if exists {
		log.Printf("Merchant %s already exists in table", merchant.Name)
		return nil
	}

	err = merchant.Insert(ctx, c.DBX)
	if err != nil {
		return fmt.Errorf("error fetching merchant %s. %v", merchant.Name, err)
	}

	return nil
}

func (c *TransactionClient) getTimeFrom(ctx context.Context) *time.Time {

	latestDate, err := query.GetLatestTransactionDate(ctx, c.DBX)
	if err != nil {
		log.Println("Error getting latest date")
		return nil
	}

	timeFrom := latestDate.Add(time.Second * 1)

	return &timeFrom
}

func getBackfillFromQuery(queryParams map[string]string) time.Time {
	backfillMonths, ok := queryParams["backfill_months"]
	var month int
	if ok {
		backfillMonths, err := strconv.Atoi(backfillMonths)
		if err == nil {
			month = backfillMonths
		}
	} else {
		month = 6
	}

	timeUntil := upclient.BackfillDate.AddDate(0, month, 0)
	return timeUntil
}
