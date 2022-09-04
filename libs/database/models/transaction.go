package models

import (
	"time"
)

type Transaction struct {
	Id        int       `meddler:id,pk`
	Amount    int       `meddler:amount`
	CreatedAt time.Time `meddler:created_at`
	Merchant  string    `meddler:merchat`
}
