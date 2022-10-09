package models

import (
	"context"
	"database/sql"
	"log"

	"github.com/russross/meddler"
)

type Budget struct {
	Id       int    `meddler:"id,pk" json:"id"`
	Category string `meddler:"category" json:"category"`
	Limit    int    `meddler:"limit" json:"limit"`
}

func (b *Budget) Insert(ctx context.Context, db *sql.DB) error {
	return meddler.Insert(db, "budgets", b)
}

func (b *Budget) Update(ctx context.Context, db *sql.DB) error {
	return meddler.Update(db, "budgets", b)
}

func FindBudgetById(ctx context.Context, db *sql.DB, id int) *Budget {
	b := &Budget{}
	err := meddler.QueryRow(db, b, "SELECT * from budgets WHERE id = ?", id)
	if err != nil {
		log.Printf("Couldn't find category with id %d", id)
		return nil
	}

	return b
}

func FindBudgetByCategory(ctx context.Context, db *sql.DB, cat string) *Budget {
	b := &Budget{}
	err := meddler.QueryRow(db, b, "SELECT * from budgets WHERE category = ?", cat)
	if err != nil {
		log.Printf("Couldn't find category with id %s", cat)
		return nil
	}

	return b
}
