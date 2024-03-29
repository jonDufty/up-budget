package database

import (
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

type DatabaseConfig struct {
	Username string `envconfig:"username"`
	Password string `envconfig:"password"`
	Host     string `envconfig:"host"`
	Name     string `envconfig:"name"`
}

func Connect(cfg DatabaseConfig, options map[string]string) (*sqlx.DB, error) {
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?tls=true", cfg.Username, cfg.Password, cfg.Host, cfg.Name)
	for k, v := range options {
		dsn += fmt.Sprintf("&%s=%s", k, v)
	}
	db, err := sqlx.Connect("mysql", dsn)
	if err != nil {
		return nil, fmt.Errorf("cannot connect to db. %w", err)
	}
	return db, nil
}

func TestPing(db *sqlx.DB) error {
	log.Println("Testing ping to Database")
	err := db.Ping()
	if err != nil {
		return fmt.Errorf("DB: ping failed. %w", err)
	}
	return nil
}
