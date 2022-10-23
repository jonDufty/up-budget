import { Box, Pagination } from '@mui/material';
import { MerchantMenu, MerchantInfo, SwitchButton } from '@up-budget/ui';
import { useState } from 'react';
import useSWR from 'swr';
import { fetcher, capitaliseApiString } from '@up-budget/frontend-api-client';
import { BudgetInfo } from '@up-budget/ui';

/* eslint-disable-next-line */
export interface MerchantsProps {}

export function Merchants(props) {
  const [filtered, setFiltered] = useState(true);
  const [page, setPage] = useState(1);

  const {
    data: merchants,
    error,
    mutate,
  } = useSWR(`/merchants?page=${page}${filtered ? '&filterUncategorised=true' : ''}`, fetcher<MerchantInfo[]>);
  const { data: budgets, error: errorBudgets } = useSWR('/budgets', fetcher<BudgetInfo[]>);

  if (error || errorBudgets) {
    console.error(error, errorBudgets);
    return <h1>An error has occurred</h1>;
  }

  if (!merchants) return <h4>Loading...;</h4>;

  let categories: string[];
  if (budgets) {
    categories = budgets.map((m) => capitaliseApiString(m.category));
  }

  return (
    <Box>
      <SwitchButton active="Uncategorised" inactive="All Merchants" onClick={setFiltered} />
      <MerchantMenu merchants={merchants} categories={categories} mutator={mutate} />
      <Pagination page={page} count={5} onChange={(e, p) => setPage(p)} />
    </Box>
  );
}

export default Merchants;
