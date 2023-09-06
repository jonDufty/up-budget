import * as Types from '@up-budget/graph-schema/types';

import { DocumentNode } from 'graphql';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

/** Budgets with a specific category */
export type Budget = {
  __typename?: 'Budget';
  /** The category of the budget */
  category: Scalars['String']['output'];
  /** The amount of money you want to spend */
  limit: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  budget: Array<Budget>;
  greetings: Scalars['String']['output'];
  hello: Scalars['String']['output'];
  helloAgain: Scalars['String']['output'];
};

export type QueryBudgetArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryGreetingsArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type QueryHelloArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type QueryHelloAgainArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type TestBudgetsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type TestBudgetsQuery = { __typename?: 'Query'; helloAgain: string };

export const TestBudgetsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'TestBudgets' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'helloAgain' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'StringValue', value: 'World', block: false },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

/**
 * __useTestBudgetsQuery__
 *
 * To run a query within a React component, call `useTestBudgetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestBudgetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestBudgetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestBudgetsQuery(
  baseOptions?: Apollo.QueryHookOptions<TestBudgetsQuery, TestBudgetsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TestBudgetsQuery, TestBudgetsQueryVariables>(TestBudgetsDocument, options);
}
export function useTestBudgetsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TestBudgetsQuery, TestBudgetsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TestBudgetsQuery, TestBudgetsQueryVariables>(TestBudgetsDocument, options);
}
export type TestBudgetsQueryHookResult = ReturnType<typeof useTestBudgetsQuery>;
export type TestBudgetsLazyQueryHookResult = ReturnType<typeof useTestBudgetsLazyQuery>;
export type TestBudgetsQueryResult = Apollo.QueryResult<TestBudgetsQuery, TestBudgetsQueryVariables>;
