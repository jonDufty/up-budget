package main

import (
	"log"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/kelseyhightower/envconfig"
)

func Hello(name string) string {
	result := "Hello " + name
	return result
}

func main() {
	cfg := MustLoadConfig()
	log.Println(cfg)
	client := NewTransactionClient(cfg)
	client.MustPing()

	lambda.Start(client.TransactionHandler)
}

func MustLoadConfig() Config {
	var cfg Config
	err := envconfig.Process("transaction", &cfg)
	if err != nil {
		log.Fatal(err.Error())
	}
	return cfg
}
