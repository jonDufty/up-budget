package main

import (
	"log"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/jonDufty/budget/apps/api/handlers"
	"github.com/jonDufty/budget/libs/database"
	"github.com/kelseyhightower/envconfig"
)

func main() {
	cfg := MustLoadConfig()
	c := handlers.NewApiClient(cfg)
	err := database.TestPing(c.DB)
	if err != nil {
		log.Fatalf("Failed to connect to DB. %v", err)
	}
	lambda.Start(c.DeleteBudgetHandler)
}

func MustLoadConfig() handlers.Config {
	var cfg handlers.Config
	err := envconfig.Process("merchants", &cfg)
	if err != nil {
		log.Fatal(err.Error())
	}
	return cfg
}
