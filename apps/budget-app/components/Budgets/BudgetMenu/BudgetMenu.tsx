import { Button, Grid, IconButton, InputAdornment, ListItem, TextField, Typography } from '@mui/material';
import { Button as NewButton, IconButton as NewIconButton } from '@up-budget/ui-tailwind';
import React, { MouseEventHandler, useState } from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { capitaliseApiString, postMutation, updateLocalData, UpdateLocalOptions } from '@up-budget/api-schema';

export interface BudgetMenuProps {
  budgets: BudgetInfo[];
  mutate: KeyedMutator<BudgetInfo[]>;
}

export interface BudgetInfo {
  category: string;
  limit?: number;
  id: number;
}

interface BudgetMenuItemProps {
  budget: BudgetInfo;
  onUpdate: (b: BudgetInfo, options?: UpdateLocalOptions) => BudgetInfo[] | undefined;
}

export function BudgetMenu({ budgets }: BudgetMenuProps) {
  const updateLocalBudget = (b: BudgetInfo, options?: UpdateLocalOptions) => {
    return updateLocalData<BudgetInfo>(budgets, b, 'category', options);
  };

  return (
    <div className="flex-col gap-8">
      {budgets.map((b: BudgetInfo) => {
        return <BudgetMenuItem onUpdate={updateLocalBudget} key={b.category} budget={b} />;
      })}
    </div>
  );
}

export function BudgetMenuItem({ budget, onUpdate }: BudgetMenuItemProps) {
  const [limit, setLimit] = useState(budget.limit);
  const [id, setId] = useState(budget.id);
  const key = budget.category;
  const { mutate, error } = useSWR('/budgets');

  const handleDelete: MouseEventHandler = (event) => {
    postMutation<BudgetInfo>(`/budgets/${budget.id}`, budget, { method: 'DELETE' });
    mutate(onUpdate(budget, { delete: true }), false);
  };

  const handleUpdate: MouseEventHandler = (event) => {
    postMutation<BudgetInfo>(`/budgets/${budget.id}`, budget);
    mutate(onUpdate(budget), false);
  };

  return (
    <Container>
      <Typography key={`${key}-text`} display="inline">
        {capitaliseApiString(budget.category)}
      </Typography>
      <div className='flex-shrink'>

      <TextField
        key={`${key}-input`}
        fullWidth
        margin="normal"
        id={`${budget.category}-budget-limit`}
        label="Limit"
        variant="outlined"
        InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
        type="number"
        value={limit}
        onChange={(e) => {
          setLimit(+e.target.value);
        }}
        />
        </div>

      <NewButton size='small' className="border-2 rounded-lg" key={`${key}-button`} variant="primary" onClick={handleUpdate}>
        Update {error && 'ERROR'}
      </NewButton>
    </Container>
  );
}

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row gap-4 content-center items-center justify-between border-1 border-gray-500 px-4 py-2 shadow-md rounded-md hover:bg-gray-100/60">
      {children}
    </div>
  );
}

export default BudgetMenu;
