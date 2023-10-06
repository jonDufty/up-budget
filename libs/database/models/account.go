package models

type Account struct {
	Id   string `meddler:"id" db:"id"`
	Name string `meddler:"name" db:"name"`
}
