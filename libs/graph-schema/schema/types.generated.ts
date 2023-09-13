export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
