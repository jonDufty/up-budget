package handlers

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/jonDufty/budget/libs/database/models"
	"github.com/jonDufty/budget/libs/database/query"
)

const filterUncategorisedKey = "filterUncategorised"

type queryFunc = func(context.Context, *sql.DB) ([]*models.Merchant, error)

func (c *ApiClient) GetMerchantHandler(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	filter, ok := event.QueryStringParameters[filterUncategorisedKey]
	var merchants []*models.Merchant
	var q queryFunc
	if ok && filter == "true" {
		q = query.GetUncategorisedMerchants
	} else {
		q = query.GetAllMerchants
	}

	merchants, err := q(ctx, c.DB)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
		}, fmt.Errorf("failed to fetch merchants. %w", err)
	}

	if len(merchants) > 10 {
		merchants = merchants[0:10]
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

type UpdateMerchantBody struct {
	Merchants []models.Merchant `json:"merchants"`
}

func (c *ApiClient) UpdateMerchantHandler(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var body UpdateMerchantBody
	err := json.Unmarshal([]byte(event.Body), &body)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       "Invalid body type",
		}, fmt.Errorf("invalid body. %w", err)
	}

	if len(body.Merchants) == 0 {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       "Invalid body type",
		}, fmt.Errorf("no merchant field or array is empty")
	}

	for _, m := range body.Merchants {
		log.Println(m)
		err = query.UpdateMerchant(ctx, c.DB, m)
		if err != nil {
			return events.APIGatewayProxyResponse{
				StatusCode: 500,
			}, fmt.Errorf("failed to update merchant %s. %w", m.Name, err)
		}
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
	}, nil
}
