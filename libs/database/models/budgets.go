package models

import (
	"context"
	"fmt"
	"log"

	"github.com/jmoiron/sqlx"
	"github.com/jonDufty/budget/libs/database/query"
)

type Budget struct {
	Id       int    `db:"id" json:"id"`
	Category string `db:"category" json:"category"`
	Limit    int    `db:"limit" json:"limit"`
}

func (b *Budget) Insert(ctx context.Context, db *sqlx.DB) error {
	stmt := fmt.Sprintf(`
  INSERT INTO budgets (category, %s)
  VALUES (?, ?);
  `, "`limit`")
	return query.ExecInsert(ctx, db, "insert budgets", stmt, b.Category, b.Limit)
}

func (b *Budget) Update(ctx context.Context, db *sqlx.DB) error {
	stmt := fmt.Sprintf(`
  UPDATE budgets
  SET %s = ?, category = ?
  WHERE id = ?;
  `, "`limit`")

	return query.ExecInsert(ctx, db, "update budget", stmt, b.Limit, b.Category, b.Id)
}

func FindBudgetById(ctx context.Context, db *sqlx.DB, id int) *Budget {
	b := &Budget{}
	err := sqlx.Get(db, b, "SELECT * FROM budgets WHERE id = ?", id)

	if err != nil {
		log.Printf("Couldn't find category with id %d", id)
		return nil
	}

	return b
}

func FindBudgetByCategory(ctx context.Context, db *sqlx.DB, cat string) *Budget {
	b := &Budget{}
	err := sqlx.Get(db, b, "SELECT * from budgets WHERE category = ?", cat)
	if err != nil {
		log.Printf("Couldn't find category with id %s", cat)
		return nil
	}

	return b
}

func (b *Budget) Delete(ctx context.Context, db *sqlx.DB) error {
	query := "DELETE FROM budgets WHERE id = ?"
	_, err := db.ExecContext(ctx, query, b.Id)
	return err
}

func GetAllBudgets(ctx context.Context, db *sqlx.DB) ([]*Budget, error) {
	var budgets []*Budget
	query := "SELECT * FROM budgets ORDER BY category"

	err := db.Select(&budgets, query)
	if err != nil {
		return nil, fmt.Errorf("failed to query budgets. %w", err)
	}
	return budgets, nil
}
