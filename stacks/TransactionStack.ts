import { Cron, StackContext } from "@serverless-stack/resources";


export function TransactionStack({ app, stack }: StackContext) {
  const cron = new Cron(stack, "ScheduledTransactionLambda", {
    schedule: 'cron(0 0 * * ? *)',
    enabled: app.local ? false : true,
    job: {
      function: {
        handler: 'transactions/main.go',
        environment: {
          "TRANSACTION_UPBANK_API_KEY": process.env.UP_API_KEY!,
          "TRANSACTION_UPBANK_ENDPOINT": 'https://api.up.com.au/api/v1'
        }
      }
    }
  })
}
