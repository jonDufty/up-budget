// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createSchema, createYoga } from 'graphql-yoga';
import { schema } from "@up-budget/graph-schema"

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

console.log(schema)

// const schema = createSchema<{
//   req: NextApiRequest;
//   res: NextApiResponse;
// }>({
//   typeDefs: /* GraphQL */ `
//     type Query {
//       greetings: String
//     }
//   `,
//   resolvers: {
//     Query: {
//       greetings: () => 'This is the `greetings` of the root `Query` type',
//     },
//   },
// });

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
});
