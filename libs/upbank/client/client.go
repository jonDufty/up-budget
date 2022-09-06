package client

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"
)

type UpbankClient struct {
	Client *ClientWithResponses
	ApiKey string
}

type UpbankConfig struct {
	Endpoint string
	ApiKey   string
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

func (c *UpbankClient) addAuthHeader(ctx context.Context, req *http.Request) error {
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", c.ApiKey))
	return nil
}

func (c *UpbankClient) overideUrl(ctx context.Context, req *http.Request, url string) (func(context.Context, *http.Request) error, error) {
	newUrl, err := req.URL.Parse(url)
	if err != nil {
		return nil, fmt.Errorf("failed to parse link URL, %W", err)
	}

	return func(ctx context.Context, req *http.Request) error {
		req.URL = newUrl
		return nil
	}, nil
}

func (c *UpbankClient) GetTransactions(ctx context.Context, pageSize int, from *time.Time, to *time.Time) ([]TransactionResource, error) {
	var status TransactionStatusEnum = "SETTLED"
	params := &GetTransactionsParams{
		PageSize:     &pageSize,
		FilterStatus: &status,
		FilterSince:  from,
		FilterUntil:  to,
	}

	resp, err := c.Client.GetTransactionsWithResponse(ctx, params, c.addAuthHeader)
	if err != nil {
		return nil, fmt.Errorf("error fetching transactions, %w", err)
	}

	if resp == nil {
		return nil, fmt.Errorf("response is empty")
	}

	transactions := resp.JSON200.Data

	return transactions, nil
}
