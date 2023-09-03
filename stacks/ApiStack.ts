import { Api, StackContext, use } from 'sst/constructs';
import { aws_route53 as route53 } from 'aws-cdk-lib';

export function DnsStack({ app, stack }: StackContext) {
  const zone = new route53.PublicHostedZone(stack, 'ApplicationHostedZone', {
    zoneName: app.stage === 'prod' ? 'budget.jdufty.com' : `budget-${app.stage}.jdufty.com`,
  });

  const mainZone = route53.HostedZone.fromLookup(stack, 'BaseHostedZone', {
    domainName: 'jdufty.com',
  })

  if (zone.hostedZoneNameServers) {
    new route53.NsRecord(stack, 'ApplicationHostedZoneDelegation', {
      zone: mainZone,
      recordName: zone.zoneName,
      values: zone.hostedZoneNameServers,
    });
  }

  if (app.stage === "prod") {
    new route53.CnameRecord(stack, 'MainAppRecord', {
      zone: mainZone,
      recordName: 'budget-app',
      domainName: 'cname.vercel-dns.com'
    })
  }

  return {
    zone,
  };
}

export function BackendApiStack({ app, stack }: StackContext) {
  const { zone } = use(DnsStack);

  new Api(stack, 'BackendApi', {
    routes: {
      // merchant routes
      'GET /merchants': 'apps/api/merchants/main.go',
      'POST /merchants/{id}': 'apps/api/update-merchants/main.go',
      // budget routes
      'GET /budgets': 'apps/api/budgets/main.go',
      'POST /budgets': 'apps/api/create-budget/main.go',
      'POST /budgets/{id}': 'apps/api/update-budgets/main.go',
      'DELETE /budgets/{id}': 'apps/api/delete-budgets/main.go',
    },
    customDomain: {
      domainName: `api.${zone.zoneName}`,
      hostedZone: zone.zoneName,
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
