import { Api, StackContext } from "@serverless-stack/resources";

export function BackendApiStack({ app, stack }: StackContext) {
  new Api(stack, "BackendApi", {
    routes: {
      "GET /merchants": "api/merchants/main.go",
      "POST /merchants": "api/update-merchants/main.go",
      "POST /merchants/{id}": "api/update-merchants/main.go",
      // budget routes
      "GET /budgets": "api/budgets/main.go",
      "POST /budgets/{id}": "api/update-budgets/main.go",

    }
  })
}
