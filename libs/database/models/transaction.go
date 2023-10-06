package models

import (
	"context"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/jonDufty/budget/libs/database/query"
	"github.com/jonDufty/budget/libs/upbank/client"
)

type Transaction struct {
	Id        string    `db:"id"`
	AccountId string    `db:"account_id"`
	Amount    int       `db:"amount"`
	CreatedAt time.Time `db:"created_at"`
	Merchant  string    `db:"merchant"`
}

func NewTransactionFromApi(r client.TransactionResource) *Transaction {
	t := &Transaction{
		Id:        r.Id,
		Amount:    r.Attributes.Amount.ValueInBaseUnits,
		AccountId: r.Relationships.Account.Data.Id,
		CreatedAt: *r.Attributes.SettledAt,
		Merchant:  r.Attributes.Description,
	}

	return t
}

func (t *Transaction) Insert(ctx context.Context, db *sqlx.DB) error {
	stmt := `
  INSERT INTO transactions (id, amount, account_id, created_at, merchant)
  VALUES (?, ?, ?, ?, ?);
  `
	return query.ExecInsert(ctx, db, "insert transaction", stmt, t.Id, t.Amount, t.AccountId, t.CreatedAt, t.Merchant)
}
