package client_test

import (
	"testing"

	"github.com/jonDufty/budget/libs/upbank/client"
)

func NewTestUpClient() *client.UpbankClient {
	cfg := client.UpbankConfig{
		Endpoint: "test.endpoint/api",
		ApiKey:   "fake-api-key",
	}

	return client.NewUpbankClient(cfg)
}

func NewApiStubServer() *client.UpbankClientStub {
	return client.NewUpStubClient()
}

func TestTransactionHandler(t *testing.T) {
	t.Fail()

}
