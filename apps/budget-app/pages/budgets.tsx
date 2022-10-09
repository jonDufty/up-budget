import { Box, Button } from '@mui/material';
import { BudgetMenu, CreateBudgetInput } from '@up-budget/ui';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import useSWR, { Fetcher, MutatorCallback, mutate, useSWRConfig } from 'swr';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

interface BudgetInfo {
  category: string;
  limit?: number;
  id?: number;
}

const API_URL = 'https://api.budget-dev.jdufty.com';

const budgetFetcher: Fetcher<BudgetInfo[]> = async (url: string) => {
  const apiUrl = API_URL + url;
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error(`Error fetching data ${res.status} ${res.statusText}`);
  }
  const budgets = (await res.json()) as BudgetInfo[];
  return budgets;
};

const mutateBudgets = async (existingData: BudgetInfo[], newData: BudgetInfo): Promise<BudgetInfo[]> => {
  const apiUrl = API_URL + '/budgets';
  console.log(`Sending to ${apiUrl}`)
  console.log(newData)
  const res = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(newData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`error updating data ${res.statusText}`)
  }

  return [
    ...existingData,
    newData
  ]
};

/* eslint-disable-next-line */
export interface BudgetsProps {}

export function Budgets(props: BudgetsProps) {
  const { data, error } = useSWR('/budgets', budgetFetcher);
  // const { mutate } = useSWRConfig();

  const [createNewMode, setCreateNewMode] = useState(false);

  const handleClick = () => {
    setCreateNewMode(!createNewMode);
  };

  const onFormSubmit: SubmitHandler<BudgetInfo> = (newBudget) => {
    console.log(newBudget);
    setCreateNewMode(false)
    // const updated = [ ...data, newBudget ];
    mutateBudgets(data, newBudget)
    mutate('/budgets');
    mutate('/budgets', (data) => [...data, newBudget], false);
  };

  if (error) {
    console.error(error);
    return <h1>An error has occurred</h1>;
  }
  if (!data) return <h4>Loading...;</h4>;

  return (
    <Box>
      <BudgetMenu budgets={data} />
      {createNewMode && <CreateBudgetInput submitHandler={onFormSubmit} />}
      <Button
        variant="text"
        size="large"
        startIcon={createNewMode ? <CloseIcon /> : <AddIcon />}
        onClick={handleClick}
        sx={{ width: '80%', alignItems: 'center', position: 'relative', marginInline: '10%' }}
      >
        {createNewMode ? 'Cancel' : 'Add New Category'}
      </Button>
    </Box>
  );
}

export default Budgets;
