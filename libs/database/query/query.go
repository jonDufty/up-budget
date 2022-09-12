package query

import (
	"context"
	"database/sql"
	"time"

	"github.com/russross/meddler"
)

func GetLatestTransactionDate(ctx context.Context, db *sql.DB) (*time.Time, error) {
	var result time.Time
	query := `SELECT max(created_at) FROM transactions`
	err := meddler.QueryRow(db, &result, query)
	if err != nil {
		return nil, err
	}

	return &result, nil
}
