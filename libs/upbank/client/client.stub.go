package client

import "context"

type UpbankClientStub struct {
	OnGetTransactionsWithResponse func(context.Context, *GetTransactionsParams, ...RequestEditorFn) (*GetTransactionsResponse, error)
}

func (s *UpbankClientStub) GetTransactionsWithResponse(ctx context.Context, params *GetTransactionsParams, reqEditors ...RequestEditorFn) (*GetTransactionsResponse, error) {
	return s.OnGetTransactionsWithResponse(ctx, params, reqEditors...)
}

func NewUpStubClient() *UpbankClientStub {
	data := []TransactionResource{
		{
			Id:   "1",
			Type: "transactions",
		},
		{
			Id:   "2",
			Type: "transactions",
		},
	}

	f := func(ctx context.Context, params *GetTransactionsParams, reqs ...RequestEditorFn) (*GetTransactionsResponse, error) {
		response := &GetTransactionsResponse{
			JSON200: &ListTransactionsResponse{
				Data: data,
			},
		}
		return response, nil
	}

	stub := &UpbankClientStub{
		OnGetTransactionsWithResponse: f,
	}

	return stub
}
