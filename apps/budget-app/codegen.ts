import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'libs/graph-schema/schema/generated.graphql',
  // documents: ['apps/budget-app/**/*.graphql'],
  generates: {
    'apps/budget-app/graph': {
      documents: ['apps/budget-app/**/*.graphql'],
      preset: 'near-operation-file',
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      presetConfig: {
        baseTypesPath: '~@up-budget/graph-schema/types',
        extension: '.generated.tsx',
      },
      config: {
        withHooks: true,
        documentMode: 'documentNode',
      },
    },
  },
};
export default config;
