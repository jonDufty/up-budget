package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/aws/aws-lambda-go/events"
	"github.com/jmoiron/sqlx"
	schema "github.com/jonDufty/budget/libs/api-schema/types/go"
	"github.com/jonDufty/budget/libs/database/models"
)

const filterUncategorisedKey = "filterUncategorised"

type queryFunc = func(context.Context, *sqlx.DB) ([]*models.Merchant, error)
type queryFuncPaged = func(context.Context, *sqlx.DB, int, int) ([]*models.Merchant, error)

func (c *ApiClient) GetMerchantHandler(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	filter, ok := event.QueryStringParameters[filterUncategorisedKey]
	queryPage := c.Settings.DefaultPage
	queryPageSize := c.Settings.PageSize

	var merchants []*models.Merchant
	var q queryFuncPaged
	if ok && filter == "true" {
		q = models.GetUncategorisedMerchants
	} else {
		q = models.GetAllMerchants
	}

	page, ok := event.QueryStringParameters["page"]
	if ok {
		p, err := strconv.Atoi(page)
		if err == nil {
			queryPage = p
		}
	}

	pageSize, ok := event.QueryStringParameters["pageSize"]
	if ok {
		p, err := strconv.Atoi(pageSize)
		if err == nil {
			queryPageSize = p
		}
	}

	merchants, err := q(ctx, c.DB, queryPage, queryPageSize)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
		}, fmt.Errorf("failed to fetch merchants. query: GetAllMerchants. %w", err)
	}

	body, err := json.Marshal(merchants)
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

func (c *ApiClient) UpdateMerchantHandler(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var body schema.PostMerchantIdJSONRequestBody
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
		}, fmt.Errorf("no merchant id provided")
	}
	id, _ := strconv.Atoi(queryId)
	m := models.FindMerchantById(ctx, c.DB, id)
	if m == nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       "Bad Request",
		}, fmt.Errorf("no merchant found with id %s", queryId)
	}

	if body.Category != nil {
		m.Category = *body.Category
	}

	err = m.Update(ctx, c.DB)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Failed to update merchant",
		}, fmt.Errorf("failed to update merchant. %w", err)
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
	}, nil
}
