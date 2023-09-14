import { GraphQLSchema } from 'graphql';
import { builder } from './builder';
import { BudgetRef as Budget } from './types/budgets';
import createClient from 'openapi-fetch';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { paths } from '@up-budget/api-schema/types';

const { GET } = createClient<paths>({
  baseUrl: 'https://api.budget.jdufty.com',
});

// builder.queryType({
//   fields: (t) => ({
//     hello: t.string({
//       args: {
//         name: t.arg.string(),
//       },
//       resolve: (parent, { name }) => `hello, ${name || 'World'}`,
//     }),
//   }),
// });

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
    type: [Budget],
    args: {
      amount: t.arg({ type: 'Int', required: false }),
    },
    resolve: async (parent, { amount }) => {
      const { data, error } = await GET('/budgets', {});
      // const data = await resp.json();
      const result = data?.map((d) => {
        return {
          limit: d.limit,
          category: d.category,
        };
      });
      return result || [];
    },
  }),
  getTime: t.field({
    type: 'String',
    resolve: () => new Date().toISOString(),
  }),
}));

export const schema: GraphQLSchema = builder.toSchema();

export default schema;
