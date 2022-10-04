package handlers

import (
	"database/sql"
	"log"

	"github.com/jonDufty/budget/libs/database"
)

type Config struct {
	Database database.DatabaseConfig `envconfig:"database"`
}

type ApiClient struct {
	DB *sql.DB
}

func NewApiClient(cfg Config) *ApiClient {

	db, err := database.Connect(cfg.Database, map[string]string{"parseTime": "true"})
	if err != nil {
		log.Fatalf("db connection failed. %v", err)
	}

	return &ApiClient{
		DB: db,
	}
}
