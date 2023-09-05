import { builder } from './builder';
import { BudgetRef as Budget } from './types/budgets';
builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (parent, { name }) => `hello, ${name || 'World'}`,
    }),
  }),
});

builder.queryFields((t) => ({
  helloAgain: t.string({
    args: {
      name: t.arg.string(),
    },
    resolve: (parent, { name }) => `hello, ${name || 'World'}`,
  }),
  greetings: t.string({
    args: {
      name: t.arg.string(),
    },
    resolve: (parent, { name }) => `hello, ${name || 'World'}`,
  }),
  budget: t.field({
    type: Budget,
    args: {
      amount: t.arg.int(),
    },
    resolve: (parent, { amount }) => {
      return {
        limit: amount || 100,
        category: 'food',
      };
    },
  }),
}));

const schema = builder.toSchema();

export { schema };
