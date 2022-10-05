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

func (c *ApiClient) GetMerchantHandler(ctx context.Context, event events.APIGatewayProxyRequest) error {
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
		return fmt.Errorf("failed to fetch merchants. %w", err)
	}

	for i, m := range merchants {
		fmt.Println(m.Name, m.UpCategory)
		if i >= 10 {
			break
		}
	}
	return nil
}

type UpdateMerchantBody struct {
	merchants []models.Merchant `json:"merchants"`
}

func (c *ApiClient) UpdateMerchantHandler(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var body UpdateMerchantBody
	err := json.Unmarshal([]byte(event.Body), body)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       "Invalid body type",
		}, err
	}

	log.Println("")

	tx, err := c.DB.BeginTx(ctx, nil)
	if err != nil {
		log.Printf("failed to create transaction. %v", err)
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
		}, err
	}

	for _, m := range body.merchants {
		err = m.UpdateTx(ctx, tx)

		if err != nil {
			log.Println(err, tx.Rollback().Error())
		}
	}

	err = tx.Commit()
	if err != nil {
		log.Printf("failed to commit transaction. %v", err)
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
		}, err
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
	}, nil
}
