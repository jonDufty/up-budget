import { Api, Cron, Function, StackContext } from '@serverless-stack/resources';

export function TransactionStack({ app, stack }: StackContext) {
  const cron = new Cron(stack, 'ScheduledTransactionLambda', {
    schedule: 'cron(0 0 * * ? *)',
    enabled: app.local ? false : true,
    job: {
      function: {
        handler: 'transactions/main.go',
        environment: {
          TRANSACTION_UPBANK_API_KEY: process.env.UP_API_KEY!,
          TRANSACTION_UPBANK_ENDPOINT: 'https://api.up.com.au/api/v1',
          TRANSACTION_UPBANK_PAGE_SIZE:
            process.env.TRANSACTION_UPBANK_PAGE_SIZE!,
          TRANSACTION_UPBANK_PAGINATE: process.env.TRANSACTION_UPBANK_PAGINATE!,
          TRANSACTION_UPBANK_TRANSACTION_LIMIT:
            process.env.TRANSACTION_UPBANK_TRANSACTION_LIMIT!,
          TRANSACTION_DATABASE_NAME: process.env.TRANSACTION_DATABASE_NAME!,
          TRANSACTION_DATABASE_USERNAME:
            process.env.TRANSACTION_DATABASE_USERNAME!,
          TRANSACTION_DATABASE_HOST: process.env.TRANSACTION_DATABASE_HOST!,
          TRANSACTION_DATABASE_PASSWORD:
            process.env.TRANSACTION_DATABASE_PASSWORD!,
        },
      },
    },
  });

}

export function BackfillStack({ app, stack }: StackContext) {

  const backfillApi = new Api(stack, 'BackfillApi', {
    routes: {
      "GET /backfill": {
        function: {
          timeout: 90,
          handler: 'transactions/main.go',
          environment: {
            TRANSACTION_UPBANK_API_KEY: process.env.UP_API_KEY!,
            TRANSACTION_UPBANK_ENDPOINT: 'https://api.up.com.au/api/v1',
            TRANSACTION_UPBANK_PAGE_SIZE: '100',
            TRANSACTION_UPBANK_PAGINATE: process.env.TRANSACTION_UPBANK_PAGINATE!,
            TRANSACTION_UPBANK_TRANSACTION_LIMIT: app.stage == "prod" ? '1000' : '100',
            TRANSACTION_UPBANK_BACKFILL_DATA: 'true',
            TRANSACTION_DATABASE_NAME: process.env.TRANSACTION_DATABASE_NAME!,
            TRANSACTION_DATABASE_USERNAME:
            process.env.TRANSACTION_DATABASE_USERNAME!,
            TRANSACTION_DATABASE_HOST: process.env.TRANSACTION_DATABASE_HOST!,
            TRANSACTION_DATABASE_PASSWORD:
            process.env.TRANSACTION_DATABASE_PASSWORD!,
          },
        },
      }
    }
  })
}
