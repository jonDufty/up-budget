import type { SSTConfig } from "sst"
import { BackendApiStack, DnsStack } from './stacks/ApiStack';
import { TransactionStack, BackfillStack } from './stacks/TransactionStack';

export default {
  config(input) {
    return {
      name: "budget-app",
      region: "ap-southeast-2",
      profile: "personal",

    }
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: 'go1.x',
      // srcPath: './apps',
      timeout: app.local ? '45 seconds' : '10 seconds'
    });

    app
      .stack(DnsStack)
      .stack(TransactionStack)
      .stack(BackfillStack)
      .stack(BackendApiStack);
  },
} satisfies SSTConfig;
