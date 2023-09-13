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
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
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
  getTime: Scalars['String']['output'];
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

export type TestTimeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TestTimeQuery = { __typename?: 'Query', getTime: string };


export const TestTimeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TestTime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTime"}}]}}]} as unknown as DocumentNode;

/**
 * __useTestTimeQuery__
 *
 * To run a query within a React component, call `useTestTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestTimeQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestTimeQuery(baseOptions?: Apollo.QueryHookOptions<TestTimeQuery, TestTimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestTimeQuery, TestTimeQueryVariables>(TestTimeDocument, options);
      }
export function useTestTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestTimeQuery, TestTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestTimeQuery, TestTimeQueryVariables>(TestTimeDocument, options);
        }
export type TestTimeQueryHookResult = ReturnType<typeof useTestTimeQuery>;
export type TestTimeLazyQueryHookResult = ReturnType<typeof useTestTimeLazyQuery>;
export type TestTimeQueryResult = Apollo.QueryResult<TestTimeQuery, TestTimeQueryVariables>;