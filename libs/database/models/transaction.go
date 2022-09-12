package models

import (
	"time"

	"github.com/jonDufty/budget/libs/upbank/client"
)

type Transaction struct {
	Id        int       `meddler:id,pk`
	AccountId string    `meddler:account_id`
	Amount    int       `meddler:amount`
	CreatedAt time.Time `meddler:created_at`
	Merchant  string    `meddler:merchant`
}

func NewTransactionFromApi(r client.TransactionResource) *Transaction {
	t := &Transaction{
		Amount:    r.Attributes.Amount.ValueInBaseUnits,
		AccountId: r.Relationships.Account.Data.Id,
		CreatedAt: *r.Attributes.SettledAt,
		Merchant:  r.Attributes.Description,
	}

	return t
}
