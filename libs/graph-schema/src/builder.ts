import SchemaBuilder from '@pothos/core';
import { components } from '@up-budget/api-schema/types';

export const builder = new SchemaBuilder<{
  Objects: components['schemas'];
}>({});

builder.queryType({});
// builder.mutationType({});
// builder.subscriptionType({});
