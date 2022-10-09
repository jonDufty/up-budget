package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"strconv"

	"github.com/aws/aws-lambda-go/events"
	"github.com/jonDufty/budget/libs/database/models"
	"github.com/jonDufty/budget/libs/database/query"
)

func (c *ApiClient) GetBudgetHandler(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	budgets, err := query.GetAllBudgets(ctx, c.DB)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
		}, fmt.Errorf("failed to fetch budgets. %w", err)
	}

	log.Println(budgets)

	body, err := json.Marshal(budgets)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
		}, fmt.Errorf("failed to marshal JSON. %w", err)
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
		Body: string(body),
	}, nil
}

type updateBudgetBody struct {
	Category string `json:"category"`
	Limit    int    `json:"limit"`
}

func (c *ApiClient) UpdateBudgetHandler(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var body updateBudgetBody
	err := json.Unmarshal([]byte(event.Body), &body)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       "Invalid body type",
		}, fmt.Errorf("invalid body. %w", err)
	}

	queryId, ok := event.PathParameters["id"]
	if !ok {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       "Missing field id",
		}, fmt.Errorf("No budget id provided")
	}
	id, _ := strconv.Atoi(queryId)
	b := models.FindBudgetById(ctx, c.DB, id)
	log.Println(b)
	if b == nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       "Bad Request",
		}, fmt.Errorf("No budget found with id %s", queryId)
	}

	if body.Category != "" {
		b.Category = body.Category
	}

	if body.Limit > 0 {
		b.Limit = body.Limit
	}

	err = b.Update(ctx, c.DB)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Failed to update budget",
		}, fmt.Errorf("failed to update budget. %w", err)
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
	}, nil
}

type createBudgetBody struct {
	Category string `json:"category"`
	Limit    int    `json:"limit"`
}

type createBudgetResponse struct {
	Category string `json:"category"`
	Limit    int    `json:"limit"`
	Id       int    `json:"id"`
}

func (c *ApiClient) CreateBudgetHandler(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var body updateBudgetBody
	err := json.Unmarshal([]byte(event.Body), &body)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       "Invalid body type",
		}, fmt.Errorf("invalid body. %w", err)
	}

	if body.Category == "" {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       "Invalid body type",
		}, fmt.Errorf("Invalid body type. Missing field 'category'")
	}

	b := &models.Budget{
		Category: body.Category,
		Limit:    body.Limit,
	}

	err = b.Insert(ctx, c.DB)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Failed to create merchant",
		}, fmt.Errorf("failed to create merchant. %w", err)
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
		Body: "New budget successfully created",
	}, nil
}
