import styled from '@emotion/styled';
import { CategoryBar, MerchantInfo } from '@up-budget/ui';
import { GetServerSideProps } from 'next';
import useSWR, { Fetcher } from 'swr';

const API_URL = "https://api.budget-dev.jdufty.com"

const fetcher: Fetcher<MerchantInfo[]> = async (url: string) => {
  const apiUrl = API_URL + url
  const res = await fetch(apiUrl)
  if (!res.ok) {
    throw new Error(`Error fetching data ${res.status} ${res.statusText}`)
  }
  const merchants = await res.json() as MerchantInfo[]
  return merchants
};

interface BudgetInfo {
  category: string;
  limit?: number;
  id?: number
}

const budgetFetcher: Fetcher<BudgetInfo[]> = async (url: string) => {
  const apiUrl = API_URL + url
  const res = await fetch(apiUrl)
  if (!res.ok) {
    throw new Error(`Error fetching data ${res.status} ${res.statusText}`)
  }
  const budgets = await res.json() as BudgetInfo[]
  return budgets
}


const MERCHANTS: MerchantInfo[] = [
  {
    name: "Bunnings",
    up_category: 'home-and-stuff',
    category: null
  },
  {
    name: "Coles",
    up_category: 'home-and-stuff',
    category: null
  },
  {
    name: "Pub 1 defined",
    up_category: 'bar-and-restaurant',
    category: 'drinks'
  },
  {
    name: "Pub 2",
    up_category: 'bar-and-restaurant',
    category: null
  },
  {
    name: "Pub 3",
    up_category: 'bar-and-restaurant',
    category: null
  },
]

const CATEGORIES = [
  "drinks",
  "groceries",
  "home"
]

/* eslint-disable-next-line */
export interface MerchantsProps {

}

export function Merchants(props) {
  const { data: merchants, error } = useSWR("/merchants", fetcher);
  const { data: budgets, error: errorBudgets } = useSWR("/budgets", budgetFetcher);

  if (error || errorBudgets) {
    console.error(error, errorBudgets)
    return <h1>An error has occurred</h1>
  }
  if (!merchants) return <h4>Loading...;</h4>

  let categories: string[]
  if (budgets) {
    categories = budgets.map((m) => m.category)
  }

  return (
    <CategoryBar merchants={merchants} categories={categories} />
  );
}

export default Merchants;
