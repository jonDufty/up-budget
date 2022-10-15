import styled from '@emotion/styled';
import { Box, Button, IconButton } from '@mui/material';
import { CategoryBar, MerchantInfo } from '@up-budget/ui';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
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

/* eslint-disable-next-line */
export interface MerchantsProps {

}

export function Merchants(props) {
  const { data: merchants, error } = useSWR("/merchants", fetcher);
  const { data: budgets, error: errorBudgets } = useSWR("/budgets", budgetFetcher);

  const updateLocalMerchant = (m: MerchantInfo) => {
    const merchantsCopy = [...merchants];
    const index = merchants.findIndex((v) => v.id === m.id);
    if (index > -1) {
      console.log(m, index)
      merchantsCopy[index] = m;
    }
    console.log(merchantsCopy);
    return merchantsCopy;
  };

  if (error || errorBudgets) {
    console.error(error, errorBudgets)
    return <h1>An error has occurred</h1>
  }
  if (!merchants) return <h4>Loading...;</h4>

  let categories: string[]
  if (budgets) {
    categories = budgets.map((m) => capitilise(m.category))
  }

  return (
    <CategoryBar onUpdate={updateLocalMerchant} merchants={merchants} categories={categories} />
  );
}

function capitilise(text: string): string {
  const words = text.split('-');
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default Merchants;
