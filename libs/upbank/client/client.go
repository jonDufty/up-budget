package client

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"
)

type UpbankClient struct {
	Client   *ClientWithResponses
	ApiKey   string
	Settings upbankSettings
}

type upbankSettings struct {
	Limit        int
	PageSize     int
	Paginate     bool
	BackfillData bool
	TimeFrom     *time.Time
	TimeUntil    *time.Time
}

type UpbankConfig struct {
	Endpoint         string `envconfig:"endpoint"`
	ApiKey           string `envconfig:"api_key"`
	PageSize         int    `envconfig:"page_size" default:"20"`
	Paginate         bool   `envconfig:"paginate" default:"false"`
	TransactionLimit int    `envconfig:"transaction_limit" default:"50"`
	BackfillData     bool   `envconfig:"backfill_data" default:"false"`
}

var BackfillDate = time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC)

func NewUpbankClient(cfg UpbankConfig) *UpbankClient {
	client, err := NewClientWithResponses(cfg.Endpoint)
	if err != nil {
		log.Fatal("could not create client", err)
	}

	return &UpbankClient{
		Client: client,
		ApiKey: cfg.ApiKey,
		Settings: upbankSettings{
			Limit:        cfg.TransactionLimit,
			PageSize:     cfg.PageSize,
			Paginate:     cfg.Paginate,
			BackfillData: cfg.BackfillData,
		},
	}
}

func printReqInfo(ctx context.Context, req *http.Request) error {
	fmt.Printf("Request Info:\nURL: %s\nMethod: %s\nHeaders: %v\n", req.URL, req.Method, req.Header)
	return nil
}

func (c *UpbankClient) addAuthHeader(ctx context.Context, req *http.Request) error {
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", c.ApiKey))
	return nil
}

func (c *UpbankClient) overideUrl(url string) func(context.Context, *http.Request) error {

	return func(ctx context.Context, req *http.Request) error {
		newUrl, err := req.URL.Parse(url)
		if err != nil {
			return fmt.Errorf("failed to parse link URL, %w", err)
		}
		req.URL = newUrl
		return nil
	}
}

func (c *UpbankClient) TestPing() error {
	log.Println("Testing ping to Up API")
	resp, err := c.Client.GetUtilPingWithResponse(context.Background(), c.addAuthHeader)
	if err != nil {
		return fmt.Errorf("ping failed. %w", err)
	}

	if resp.StatusCode() != http.StatusOK {
		return fmt.Errorf("failed to get response from Ping. %v", resp.JSON401.Errors[0])
	}

	return nil
}

func (c *UpbankClient) GetTransactions(ctx context.Context) ([]TransactionResource, error) {
	var status TransactionStatusEnum = "SETTLED"
	if c.Settings.TimeUntil == nil {
		timeUntil := time.Now()
		c.Settings.TimeUntil = &timeUntil
	}

	if c.Settings.TimeFrom == nil {
		timeFrom := c.Settings.TimeUntil.AddDate(0, 0, -1)
		c.Settings.TimeFrom = &timeFrom
	}

	params := &GetTransactionsParams{
		PageSize:     &c.Settings.PageSize,
		FilterStatus: &status,
		FilterSince:  c.Settings.TimeFrom,
		FilterUntil:  c.Settings.TimeUntil,
	}

	log.Println(*params.FilterSince, *params.FilterUntil)

	resp, err := c.Client.GetTransactionsWithResponse(ctx, params, c.addAuthHeader)
	if err != nil {
		return nil, fmt.Errorf("error fetching transactions, %w", err)
	}

	if resp == nil {
		return nil, fmt.Errorf("response is empty")
	}

	transactions := resp.JSON200.Data

	if !c.Settings.Paginate {
		return transactions, nil
	}

	nTrans := len(transactions)
	for nTrans <= c.Settings.Limit {
		next := resp.JSON200.Links.Next
		if next == nil {
			break
		}

		log.Println("Attempting pagination to", *next)
		resp, err = c.Client.GetTransactionsWithResponse(ctx, params, c.addAuthHeader, c.overideUrl(*next))
		if err != nil {
			return nil, fmt.Errorf("error fetching transactions, %w", err)
		}

		if resp == nil {
			return nil, fmt.Errorf("response is empty")
		}
		transactions = append(transactions, resp.JSON200.Data...)
		nTrans = len(transactions)
	}

	return transactions, nil

}

func (c *UpbankClient) PrintErrors(errors []ErrorObject) {
	for _, err := range errors {
		log.Printf("%s: %s\n", err.Title, err.Detail)
	}
}

func (c *UpbankClient) IsInternalTransfer(t TransactionResource) bool {
	return t.Relationships.TransferAccount.Data != nil
}
