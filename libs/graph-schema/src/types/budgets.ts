import { builder } from '../builder';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import type { components } from '@up-budget/api-schema/types';

type BudgetT = components['schemas']['budget'];

export const BudgetRef = builder.objectRef<BudgetT>('Budget').implement({
  description: 'Budgets with a specific category',
  fields: (t) => ({
    limit: t.exposeInt('limit', {
      description: 'The amount of money you want to spend',
    }),
    category: t.exposeString('category', {
      description: 'The category of the budget',
    }),
  }),
});
