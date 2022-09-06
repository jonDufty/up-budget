package main

import (
	"context"
	"log"

	"github.com/aws/aws-lambda-go/lambda"
	upclient "github.com/jonDufty/budget/libs/upbank/client"
	"github.com/kelseyhightower/envconfig"
)

func Hello(name string) string {
	result := "Hello " + name
	return result
}

type TransactionHandlerConfig struct {
	UpBank upclient.UpbankConfig `envconfig:"upbank"`
}

func main() {
	cfg := MustLoadConfig()
	log.Println(cfg)
	client := upclient.NewUpbankClient(cfg.UpBank)
	client.TestPing(context.Background())

	lambda.Start(client.TransactionHandler)
}

func MustLoadConfig() TransactionHandlerConfig {
	var cfg TransactionHandlerConfig
	err := envconfig.Process("transaction", &cfg)
	if err != nil {
		log.Fatal(err.Error())
	}
	return cfg
}
