package models

type Budget struct {
	Category string `meddler:category`
	Limit    int    `meddler:limit`
}
