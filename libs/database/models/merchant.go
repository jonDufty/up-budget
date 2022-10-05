package models

import (
	"context"
	"database/sql"

	"github.com/jonDufty/budget/libs/upbank/client"
	"github.com/russross/meddler"
)

type Merchant struct {
	Name       string `meddler:"name" json:"name"`
	Category   string `meddler:"category" json:"category"`
	UpCategory string `meddler:"up_category" json:"up_category"`
}

func NewMerchantFromApi(r client.TransactionResource) *Merchant {
	var category string = ""
	if r.Relationships.Category.Data != nil {
		category = r.Relationships.Category.Data.Id
	}

	m := &Merchant{
		Name:       r.Attributes.Description,
		UpCategory: category,
	}

	return m
}

func (m *Merchant) Insert(ctx context.Context, db *sql.DB) error {
	return meddler.Insert(db, "merchants", m)
}

func (m *Merchant) Update(ctx context.Context, db *sql.DB) error {
	return meddler.Update(db, "merchants", m)
}

func (m *Merchant) UpdateTx(ctx context.Context, db *sql.Tx) error {
	return meddler.Update(db, "merchants", m)
}
