package models

import (
	"context"
	"database/sql"

	"github.com/jonDufty/budget/libs/upbank/client"
	"github.com/russross/meddler"
)

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

func (m *Merchant) Insert(ctx context.Context, db *sql.DB) error {
	return meddler.Insert(db, "merchants", m)
}
