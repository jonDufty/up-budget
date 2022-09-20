import { App } from '@serverless-stack/resources';
import { TransactionStack, BackfillStack } from './TransactionStack';

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: 'go1.x',
    srcPath: './apps',
    timeout: app.local ? '45 seconds': '10 seconds'
  });

  app.stack(TransactionStack).stack(BackfillStack);
}
