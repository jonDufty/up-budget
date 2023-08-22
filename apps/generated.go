// Package handlers provides primitives to interact with the openapi HTTP API.
//
// Code generated by github.com/deepmap/oapi-codegen version v1.13.4 DO NOT EDIT.
package handlers

import (
	"fmt"
	"net/http"

	"github.com/deepmap/oapi-codegen/pkg/runtime"
	"github.com/labstack/echo/v4"
)

// Budget defines model for budget.
type Budget struct {
	Category string `json:"category"`
	Id       *int   `json:"id,omitempty"`
	Limit    int    `json:"limit"`
}

// Merchant defines model for merchant.
type Merchant struct {
	Category *string `json:"category,omitempty"`
}

// GetMerchantsParams defines parameters for GetMerchants.
type GetMerchantsParams struct {
	FilterUncategorised *bool `form:"filterUncategorised,omitempty" json:"filterUncategorised,omitempty"`
}

// DeleteBudgetsIdJSONRequestBody defines body for DeleteBudgetsId for application/json ContentType.
type DeleteBudgetsIdJSONRequestBody = Budget

// PostMerchantIdJSONRequestBody defines body for PostMerchantId for application/json ContentType.
type PostMerchantIdJSONRequestBody = Merchant

// ServerInterface represents all server handlers.
type ServerInterface interface {

	// (GET /budgets)
	GetBudgets(ctx echo.Context) error

	// (POST /budgets)
	PostBudgets(ctx echo.Context) error

	// (DELETE /budgets/{id})
	DeleteBudgetsId(ctx echo.Context, id int) error

	// (GET /budgets/{id})
	GetBudgetsId(ctx echo.Context, id int) error

	// (POST /budgets/{id})
	PostBudgetsId(ctx echo.Context, id int) error

	// (POST /merchant/{id})
	PostMerchantId(ctx echo.Context, id int) error

	// (GET /merchants)
	GetMerchants(ctx echo.Context, params GetMerchantsParams) error
}

// ServerInterfaceWrapper converts echo contexts to parameters.
type ServerInterfaceWrapper struct {
	Handler ServerInterface
}

// GetBudgets converts echo context to params.
func (w *ServerInterfaceWrapper) GetBudgets(ctx echo.Context) error {
	var err error

	// Invoke the callback with all the unmarshaled arguments
	err = w.Handler.GetBudgets(ctx)
	return err
}

// PostBudgets converts echo context to params.
func (w *ServerInterfaceWrapper) PostBudgets(ctx echo.Context) error {
	var err error

	// Invoke the callback with all the unmarshaled arguments
	err = w.Handler.PostBudgets(ctx)
	return err
}

// DeleteBudgetsId converts echo context to params.
func (w *ServerInterfaceWrapper) DeleteBudgetsId(ctx echo.Context) error {
	var err error
	// ------------- Path parameter "id" -------------
	var id int

	err = runtime.BindStyledParameterWithLocation("simple", false, "id", runtime.ParamLocationPath, ctx.Param("id"), &id)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter id: %s", err))
	}

	// Invoke the callback with all the unmarshaled arguments
	err = w.Handler.DeleteBudgetsId(ctx, id)
	return err
}

// GetBudgetsId converts echo context to params.
func (w *ServerInterfaceWrapper) GetBudgetsId(ctx echo.Context) error {
	var err error
	// ------------- Path parameter "id" -------------
	var id int

	err = runtime.BindStyledParameterWithLocation("simple", false, "id", runtime.ParamLocationPath, ctx.Param("id"), &id)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter id: %s", err))
	}

	// Invoke the callback with all the unmarshaled arguments
	err = w.Handler.GetBudgetsId(ctx, id)
	return err
}

// PostBudgetsId converts echo context to params.
func (w *ServerInterfaceWrapper) PostBudgetsId(ctx echo.Context) error {
	var err error
	// ------------- Path parameter "id" -------------
	var id int

	err = runtime.BindStyledParameterWithLocation("simple", false, "id", runtime.ParamLocationPath, ctx.Param("id"), &id)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter id: %s", err))
	}

	// Invoke the callback with all the unmarshaled arguments
	err = w.Handler.PostBudgetsId(ctx, id)
	return err
}

// PostMerchantId converts echo context to params.
func (w *ServerInterfaceWrapper) PostMerchantId(ctx echo.Context) error {
	var err error
	// ------------- Path parameter "id" -------------
	var id int

	err = runtime.BindStyledParameterWithLocation("simple", false, "id", runtime.ParamLocationPath, ctx.Param("id"), &id)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter id: %s", err))
	}

	// Invoke the callback with all the unmarshaled arguments
	err = w.Handler.PostMerchantId(ctx, id)
	return err
}

// GetMerchants converts echo context to params.
func (w *ServerInterfaceWrapper) GetMerchants(ctx echo.Context) error {
	var err error

	// Parameter object where we will unmarshal all parameters from the context
	var params GetMerchantsParams
	// ------------- Optional query parameter "filterUncategorised" -------------

	err = runtime.BindQueryParameter("form", true, false, "filterUncategorised", ctx.QueryParams(), &params.FilterUncategorised)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("Invalid format for parameter filterUncategorised: %s", err))
	}

	// Invoke the callback with all the unmarshaled arguments
	err = w.Handler.GetMerchants(ctx, params)
	return err
}

// This is a simple interface which specifies echo.Route addition functions which
// are present on both echo.Echo and echo.Group, since we want to allow using
// either of them for path registration
type EchoRouter interface {
	CONNECT(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	DELETE(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	GET(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	HEAD(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	OPTIONS(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	PATCH(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	POST(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	PUT(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
	TRACE(path string, h echo.HandlerFunc, m ...echo.MiddlewareFunc) *echo.Route
}

// RegisterHandlers adds each server route to the EchoRouter.
func RegisterHandlers(router EchoRouter, si ServerInterface) {
	RegisterHandlersWithBaseURL(router, si, "")
}

// Registers handlers, and prepends BaseURL to the paths, so that the paths
// can be served under a prefix.
func RegisterHandlersWithBaseURL(router EchoRouter, si ServerInterface, baseURL string) {

	wrapper := ServerInterfaceWrapper{
		Handler: si,
	}

	router.GET(baseURL+"/budgets", wrapper.GetBudgets)
	router.POST(baseURL+"/budgets", wrapper.PostBudgets)
	router.DELETE(baseURL+"/budgets/:id", wrapper.DeleteBudgetsId)
	router.GET(baseURL+"/budgets/:id", wrapper.GetBudgetsId)
	router.POST(baseURL+"/budgets/:id", wrapper.PostBudgetsId)
	router.POST(baseURL+"/merchant/:id", wrapper.PostMerchantId)
	router.GET(baseURL+"/merchants", wrapper.GetMerchants)

}
