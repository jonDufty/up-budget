package models

type Merchant struct {
	Name       string `meddler:name`
	Category   string `meddler:category`
	UpCategory string `meddler:up_category`
}
