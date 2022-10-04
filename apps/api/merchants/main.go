package main

import (
	"context"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func main() {

	lambda.Start(handler)
}

func handler(ctx context.Context, event events.APIGatewayProxyRequest) error {
	log.Println("Hello there")
	log.Println("id", event.PathParameters["id"])
	return nil
}
