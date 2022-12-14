package query

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/jonDufty/budget/libs/database/models"
	"github.com/russross/meddler"
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

func ExecInsert(ctx context.Context, db *sql.DB, action string, query string, args ...any) error {

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

func UpdateMerchant(ctx context.Context, db *sql.DB, merchant models.Merchant) error {
	query := `
  UPDATE merchants
  SET category = ?
  WHERE name = ?
  `
	return ExecInsert(ctx, db, "update merchant", query, merchant.Category, merchant.Name)
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

func GetAllMerchants(ctx context.Context, db *sql.DB, page int, pageSize int) ([]*models.Merchant, error) {
	var merchants []*models.Merchant
	cursor := pageSize * (page - 1)
	query := "SELECT * FROM merchants ORDER BY name LIMIT ?,?"

	err := meddler.QueryAll(db, &merchants, query, cursor, cursor+pageSize)
	if err != nil {
		return nil, fmt.Errorf("failed to query merchants. %w", err)
	}
	return merchants, nil
}

func GetUncategorisedMerchants(ctx context.Context, db *sql.DB, page int, pageSize int) ([]*models.Merchant, error) {
	var merchants []*models.Merchant
	cursor := pageSize * (page - 1)
	query := "SELECT * FROM merchants WHERE category = ? ORDER BY name LIMIT ?,?"

	err := meddler.QueryAll(db, &merchants, query, "", cursor, cursor+pageSize)
	if err != nil {
		return nil, fmt.Errorf("failed to query merchants. %w", err)
	}
	return merchants, nil
}

func GetAllBudgets(ctx context.Context, db *sql.DB) ([]*models.Budget, error) {
	var budgets []*models.Budget
	query := "SELECT * FROM budgets ORDER BY category"

	err := meddler.QueryAll(db, &budgets, query)
	if err != nil {
		return nil, fmt.Errorf("failed to query budgets. %w", err)
	}
	return budgets, nil
}

func RemoveBudgetsFromMerchants(ctx context.Context, db *sql.DB, category string) error {
	query := "UPDATE merchants SET category = '' WHERE category = ?"
	_, err := db.Exec(query, category)
	if err != nil {
		return fmt.Errorf("failed to update category for merchants. %w", err)
	}
	return nil
}

// INSERT INTO table (id, name, age) VALUES(1, "A", 19) ON DUPLICATE KEY UPDATE
// name="A", age=19
