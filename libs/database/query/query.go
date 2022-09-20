package query

import (
	"context"
	"database/sql"
	"fmt"
	"time"
)

func GetLatestTransactionDate(ctx context.Context, db *sql.DB) (*time.Time, error) {
	var result time.Time
	query := "SELECT MAX(created_at) FROM transactions"
	err := db.QueryRow(query).Scan(&result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func InsertIgnoreTransaction(ctx context.Context, db *sql.DB, args ...any) error {
	query := `
  INSERT IGNORE INTO transactions (id, amount, account_id, created_at, merchant)
  VALUES (?, ?, ?, ?, ?);
  `
	stmt, err := db.Prepare(query)
	if err != nil {
		return fmt.Errorf("failed to prepare insert statement. %w", err)
	}

	_, err = stmt.Exec(args...)
	if err != nil {
		return fmt.Errorf("failed to insert transaction. %w", err)
	}

	return nil
}

func MerchantExists(ctx context.Context, db *sql.DB, name string) (bool, error) {
	var result int
	query := "SELECT EXISTS(SELECT * FROM merchants WHERE name = ?)"
	err := db.QueryRow(query, name).Scan(&result)
	if err != nil {
		return false, err
	}

	return result > 0, nil
}
