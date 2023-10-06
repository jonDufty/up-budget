package handlers

import (
	"log"

	"github.com/jmoiron/sqlx"
	"github.com/jonDufty/budget/libs/database"
)

type Config struct {
	Database database.DatabaseConfig `envconfig:"database"`
}

type ApiClient struct {
	DB       *sqlx.DB
	Settings Settings
}

type Settings struct {
	PageSize    int
	DefaultPage int
}

func NewApiClient(cfg Config) *ApiClient {

	db, err := database.Connect(cfg.Database, map[string]string{"parseTime": "true"})
	if err != nil {
		log.Fatalf("db connection failed. %v", err)
	}

	return &ApiClient{
		DB: db,
		Settings: Settings{
			PageSize:    25,
			DefaultPage: 1,
		},
	}
}
