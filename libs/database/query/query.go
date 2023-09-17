package query

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/jmoiron/sqlx"
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

func ExecInsert(ctx context.Context, db *sqlx.DB, action string, query string, args ...any) error {

	stmt, err := db.Prepare(query)
	if err != nil {
		return fmt.Errorf("failed to prepare %s statement. %w", action, err)
	}

	_, err = stmt.Exec(args...)
	if err != nil {
		return fmt.Errorf("failed to %s. %w", action, err)
	}

	return nil
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

// INSERT INTO table (id, name, age) VALUES(1, "A", 19) ON DUPLICATE KEY UPDATE
// name="A", age=19
