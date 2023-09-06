import { printSchema } from 'graphql';
import type { CodegenConfig } from '@graphql-codegen/cli';
import { schema } from '../src/schema';

const config: CodegenConfig = {
  schema: printSchema(schema),
  // documents: ['libs/graph-schema/src/types/*.ts'],
  generates: {
    'libs/graph-schema/schema/generated.graphql': {
      plugins: ['schema-ast'],
    },
    'libs/graph-schema/schema/types.generated.ts': {
      plugins: ['typescript'],
    },
  },
};

export default config;
