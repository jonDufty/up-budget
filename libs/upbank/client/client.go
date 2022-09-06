package client

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/aws/aws-lambda-go/events"
)

type UpbankClient struct {
	Client *ClientWithResponses
	ApiKey string
}

type UpbankConfig struct {
	Endpoint string `envconfig:"endpoint"`
	ApiKey   string `envconfig:"api_key"`
}

func NewUpbankClient(cfg UpbankConfig) *UpbankClient {
	client, err := NewClientWithResponses(cfg.Endpoint)
	if err != nil {
		log.Fatal("could not create client", err)
	}

	return &UpbankClient{
		Client: client,
		ApiKey: cfg.ApiKey,
	}
}

func (c *UpbankClient) TransactionHandler(ctx context.Context, event events.CloudWatchEvent) error {
	transactions, err := c.GetTransactions(ctx, 2, time.Now().AddDate(-2, 0, 0), time.Now())
	if err != nil {
		return fmt.Errorf("transactions failed: %w", err)
	}

	log.Println(transactions[0])

	return nil
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

func (c *UpbankClient) TestPing(ctx context.Context) error {
	log.Println("Testing ping to client")
	resp, err := c.Client.GetUtilPingWithResponse(ctx, c.addAuthHeader)
	if err != nil {
		return fmt.Errorf("ping failed. %w", err)
	}

	if resp.StatusCode() != http.StatusOK {
		return fmt.Errorf("failed to get response from Ping. %v", resp.JSON401.Errors[0])
	}
	return nil
}

func (c *UpbankClient) GetTransactions(ctx context.Context, pageSize int, from time.Time, to time.Time) ([]TransactionResource, error) {
	var status TransactionStatusEnum = "SETTLED"
	params := &GetTransactionsParams{
		PageSize:     &pageSize,
		FilterStatus: &status,
		FilterSince:  &from,
		FilterUntil:  &to,
	}

	resp, err := c.Client.GetTransactionsWithResponse(ctx, params, c.addAuthHeader)
	if err != nil {
		return nil, fmt.Errorf("error fetching transactions, %w", err)
	}

	if resp == nil {
		return nil, fmt.Errorf("response is empty")
	}

	transactions := resp.JSON200.Data
	next := resp.JSON200.Links.Next
	log.Println(transactions[0])

	if next != nil {
		log.Println("Attempting pagination to", *next)
		resp, err = c.Client.GetTransactionsWithResponse(ctx, params, c.addAuthHeader, c.overideUrl(*next))
		if err != nil {
			return nil, fmt.Errorf("error fetching transactions, %w", err)
		}

		if resp == nil {
			return nil, fmt.Errorf("response is empty")
		}
	}

	return transactions, nil
}

func (c *UpbankClient) PrintErrors(errors []ErrorObject) {
	for _, err := range errors {
		log.Printf("%s: %s\n", err.Title, err.Detail)
	}
}
