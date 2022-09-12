package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/jonDufty/budget/libs/database"
	"github.com/jonDufty/budget/libs/database/models"
	upclient "github.com/jonDufty/budget/libs/upbank/client"
)

type TransactionClient struct {
	Upbank *upclient.UpbankClient
	DB     *sql.DB
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

	return &TransactionClient{
		Upbank: client,
		DB:     db,
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
}

func (c *TransactionClient) TransactionHandler(ctx context.Context, event events.CloudWatchEvent) error {
	transactions, err := c.Upbank.GetTransactions(ctx, 5, time.Now().AddDate(-7, 0, 0), time.Now())
	if err != nil {
		return fmt.Errorf("transactions failed: %w", err)
	}

	for _, t := range transactions {
		trans := models.NewTransactionFromApi(t)
		log.Println(trans)
	}

	return nil
}
