import { Box, Button } from '@mui/material';
import { BudgetInfo, BudgetMenu, CreateBudgetInput } from '@up-budget/ui';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import useSWR, { Fetcher, MutatorCallback, mutate, useSWRConfig } from 'swr';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { convertToApiString, fetcher, postMutation } from '@up-budget/frontend-api-client';


/* eslint-disable-next-line */
export interface BudgetsProps {}

export function Budgets(props: BudgetsProps) {
  const { data, error, mutate } = useSWR('/budgets', fetcher<BudgetInfo[]>);

  const [createNewMode, setCreateNewMode] = useState(false);

  const handleClick = () => {
    setCreateNewMode(!createNewMode);
  };

  const createNewBudget: SubmitHandler<BudgetInfo> = (b: BudgetInfo) => {
    setCreateNewMode(false)
    postMutation<BudgetInfo>('/budgets', { ...b, category: convertToApiString(b.category) })
    mutate((data) => [...data, b], false);
  };

  if (error) {
    console.error(error);
    return <h1>An error has occurred</h1>;
  }
  if (!data) {
    console.log(data)
    return <h4>Loading...;</h4>;
  }

  return (
    <Box>
      <BudgetMenu budgets={data} mutate={mutate} />
      {createNewMode && <CreateBudgetInput submitHandler={createNewBudget} />}
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
