package models

type Account struct {
	Id   string `db:"id"`
	Name string `db:"name"`
}
