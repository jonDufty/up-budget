import { Api, StackContext, use } from '@serverless-stack/resources';
import { aws_route53 as route53 } from 'aws-cdk-lib'

export function DnsStack({ app, stack }: StackContext) {
  const zone = new route53.PublicHostedZone(stack, "ApplicationHostedZone", {
    zoneName: app.stage === "prod" ? "budget.jdufty.com" : `budget-${app.stage}.jdufty.com`,
  })

  if (zone.hostedZoneNameServers) {
    new route53.NsRecord(stack, "ApplicationHostedZoneDelegation", {
      zone: route53.HostedZone.fromLookup(stack, "BaseHostedZone", {
        domainName: "jdufty.com"
      }),
      recordName: zone.zoneName,
      values: zone.hostedZoneNameServers,
    })
  }

  return {
    zone
  }
}

export function BackendApiStack({ app, stack }: StackContext) {

  const { zone } = use(DnsStack)

  new Api(stack, 'BackendApi', {
    routes: {
      // merchant routes
      'GET /merchants': 'api/merchants/main.go',
      // 'POST /merchants': 'api/update-merchants/main.go',
      'POST /merchants/{id}': 'api/update-merchants/main.go',
      // budget routes
      'GET /budgets': 'api/budgets/main.go',
      'POST /budgets': 'api/create-budget/main.go',
      'POST /budgets/{id}': 'api/update-budgets/main.go',
      'DELETE /budgets/{id}': 'api/delete-budgets/main.go'
    },
    customDomain: {
      domainName: app.stage == "prod" ? "api.budget.jdufty.com" : `api.budget-${app.stage}.jdufty.com`,
      hostedZone: zone.zoneName
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
