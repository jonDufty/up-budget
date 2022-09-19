package models

import "github.com/jonDufty/budget/libs/upbank/client"

type Merchant struct {
	Name       string `meddler:"name"`
	Category   string `meddler:"category"`
	UpCategory string `meddler:"up_category"`
}

func NewMerchantFromApi(r client.TransactionResource) *Merchant {
	m := &Merchant{
		Name:       r.Attributes.Description,
		UpCategory: r.Relationships.Category.Data.Id,
	}

	return m
}
