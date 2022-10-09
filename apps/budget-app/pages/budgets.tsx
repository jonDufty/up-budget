import { Box, Button } from '@mui/material';
import { BudgetMenu, CreateBudgetInput } from '@up-budget/ui';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import useSWR, { Fetcher } from 'swr';
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
interface IFormInputs {
  category: string;
  limit: number;
}
const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

/* eslint-disable-next-line */
export interface BudgetsProps {}

export function Budgets(props: BudgetsProps) {
  const { data: budgets, error } = useSWR('/budgets', budgetFetcher);

  const [createNewMode, setCreateNewMode] = useState(false);

  const handleClick = () => {
    setCreateNewMode(!createNewMode);
  };

  if (error) {
    console.error(error);
    return <h1>An error has occurred</h1>;
  }
  if (!budgets) return <h4>Loading...;</h4>;

  return (
    <Box>
      <BudgetMenu budgets={budgets} />
      {createNewMode && <CreateBudgetInput submitHandler={onSubmit} />}
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
