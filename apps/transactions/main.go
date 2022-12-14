package main

import (
	"log"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/jonDufty/budget/apps/transactions/handler"
	"github.com/kelseyhightower/envconfig"
)

func Hello(name string) string {
	result := "Hello " + name
	return result
}

func main() {
	cfg := MustLoadConfig()
	client := handler.NewTransactionClient(cfg)
	client.MustPing()

	if cfg.UpBank.BackfillData {
		lambda.Start(client.BackfillTransactionHandler)
	}

	lambda.Start(client.TransactionHandler)
}

func MustLoadConfig() handler.Config {
	var cfg handler.Config
	err := envconfig.Process("transaction", &cfg)
	if err != nil {
		log.Fatal(err.Error())
	}
	return cfg
}
