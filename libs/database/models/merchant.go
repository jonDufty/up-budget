package models

import (
	"context"
	"fmt"
	"log"

	"github.com/jmoiron/sqlx"
	"github.com/jonDufty/budget/libs/database/query"
	"github.com/jonDufty/budget/libs/upbank/client"
)

type Merchant struct {
	Id         int    `meddler:"id,pk" db:"id" json:"id"`
	Name       string `meddler:"name" db:"name" json:"name"`
	Category   string `meddler:"category" db:"category" json:"category"`
	UpCategory string `meddler:"up_category" db:"up_category" json:"up_category"`
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

func (m *Merchant) Insert(ctx context.Context, db *sqlx.DB) error {
	stmt := `
  INSERT INTO merchants (name, category, up_category)
  VALUES (?, ?, ?);
  `

	return query.ExecInsert(ctx, db, "insert merchants", stmt, m.Name, m.Category, m.UpCategory)
}

func (m *Merchant) Update(ctx context.Context, db *sqlx.DB) error {
	stmt := `
  UPDATE merchants
  SET category = ?, up_category = ?, name = ?
  WHERE id = ?;
  `
	return query.ExecInsert(ctx, db, "update merchant", stmt, m.Category, m.UpCategory, m.Name, m.Id)
}

func FindMerchantById(ctx context.Context, db *sqlx.DB, id int) *Merchant {
	m := &Merchant{}
	err := db.Get(m, "SELECT * FROM merchants WHERE id = ?", id)
	if err != nil {
		log.Printf("Couldn't find merchant with id %d", id)
		return nil
	}

	return m
}

func FindMerchantByName(ctx context.Context, db *sqlx.DB, name string) *Merchant {
	m := &Merchant{}
	err := db.Get(m, "SELECT * FROM merchants WHERE name = ?", name)
	if err != nil {
		log.Printf("Couldn't find merchant with name %s", name)
		return nil
	}

	return m
}

func UpdateMerchant(ctx context.Context, db *sqlx.DB, merchant Merchant) error {
	stmt := `
  UPDATE merchants
  SET category = ?
  WHERE name = ?;
  `
	return query.ExecInsert(ctx, db, "update merchant", stmt, merchant.Category, merchant.Name)
}

func GetAllMerchants(ctx context.Context, db *sqlx.DB, page int, pageSize int) ([]*Merchant, error) {
	var merchants []*Merchant
	cursor := pageSize * (page - 1)
	query := "SELECT * FROM merchants ORDER BY name LIMIT ?,?"

	err := db.Select(&merchants, query, cursor, cursor+pageSize)
	fmt.Println("Fetching all merchants")
	if err != nil {
		return nil, fmt.Errorf("failed to query merchants. %w", err)
	}
	return merchants, nil
}

func GetUncategorisedMerchants(ctx context.Context, db *sqlx.DB, page int, pageSize int) ([]*Merchant, error) {
	var merchants []*Merchant
	cursor := pageSize * (page - 1)
	query := "SELECT * FROM merchants WHERE category = ? ORDER BY name LIMIT ?,?"

	err := db.Select(&merchants, query, "", cursor, cursor+pageSize)
	if err != nil {
		return nil, fmt.Errorf("failed to query merchants. %w", err)
	}
	return merchants, nil
}

func RemoveBudgetsFromMerchants(ctx context.Context, db *sqlx.DB, category string) error {
	query := "UPDATE merchants SET category = '' WHERE category = ?"
	_, err := db.Exec(query, category)
	if err != nil {
		return fmt.Errorf("failed to update category for merchants. %w", err)
	}
	return nil
}
