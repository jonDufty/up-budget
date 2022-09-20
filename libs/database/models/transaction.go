package models

import (
	"context"
	"database/sql"
	"time"

	"github.com/jonDufty/budget/libs/database/query"
	"github.com/jonDufty/budget/libs/upbank/client"
	"github.com/russross/meddler"
)

type Transaction struct {
	Id        string    `meddler:"id"`
	AccountId string    `meddler:"account_id"`
	Amount    int       `meddler:"amount"`
	CreatedAt time.Time `meddler:"created_at"`
	Merchant  string    `meddler:"merchant"`
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

func (t *Transaction) Insert(ctx context.Context, db *sql.DB) error {
	return meddler.Insert(db, "transactions", t)
}

func (t *Transaction) InsertIgnore(ctx context.Context, db *sql.DB) error {
	return query.InsertIgnoreTransaction(ctx, db, t.Id, t.Amount, t.AccountId, t.CreatedAt, t.Merchant)
}
