package handlers

import (
	"context"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/jonDufty/budget/libs/database/query"
)

func (c *ApiClient) GetMerchantHandler(ctx context.Context, event events.APIGatewayProxyRequest) error {
	merchants, err := query.GetAllMerchants(ctx, c.DB)
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
