package models

import (
	"context"
	"database/sql"
	"log"

	"github.com/jonDufty/budget/libs/upbank/client"
	"github.com/russross/meddler"
)

type Merchant struct {
	Id         int    `meddler:"id" json:"id"`
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

func FindMerchantById(ctx context.Context, db *sql.DB, id int) *Merchant {
	m := &Merchant{}
	err := meddler.QueryRow(db, m, "SELECT * from merchants WHERE id = ?", id)
	if err != nil {
		log.Printf("Couldn't find merchant with id %d", id)
	}

	return m
}

func FindMerchantByName(ctx context.Context, db *sql.DB, name string) *Merchant {
	m := &Merchant{}
	err := meddler.QueryRow(db, m, "SELECT * from merchants WHERE name = ?", name)
	if err != nil {
		log.Printf("Couldn't find merchant with name %s", name)
	}

	return m
}
