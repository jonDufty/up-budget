import { Api, StackContext } from '@serverless-stack/resources';

export function BackendApiStack({ app, stack }: StackContext) {
  new Api(stack, 'BackendApi', {
    routes: {
      'GET /merchants': 'api/merchants/main.go',
      'POST /merchants': 'api/update-merchants/main.go',
      'POST /merchants/{id}': 'api/update-merchants/main.go',
      // budget routes
      'GET /budgets': 'api/budgets/main.go',
      'POST /budgets/{id}': 'api/update-budgets/main.go',
    },
    defaults: {
      function: {
        environment: {
          MERCHANTS_DATABASE_NAME: process.env.TRANSACTION_DATABASE_NAME!,
          MERCHANTS_DATABASE_USERNAME: process.env.TRANSACTION_DATABASE_USERNAME!,
          MERCHANTS_DATABASE_HOST: process.env.TRANSACTION_DATABASE_HOST!,
          MERCHANTS_DATABASE_PASSWORD: process.env.TRANSACTION_DATABASE_PASSWORD!,
        },
      },
    },
  });
}
