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
  onUpdate: any;
}

export function BudgetItem({ budget, onUpdate }: BudgetMenuItemProps) {
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
      <NameDisplay name={capitaliseApiString(budget.category)} secondary={'pubs and bars'} />
      <PriceDisplay price={budget.limit} />
    </Container>
  );
}

function EmojiDisplay({ emoji, altText }: { emoji: string; altText?: string }) {
  return (
    <span role="img" aria-label={altText} className="font-sans font-bold text-gray-900 text-lg">
      {emoji}
    </span>
  );
}

function NameDisplay({ name, secondary }: { name: string; secondary?: string }) {
  return (
    <div className="p-1 flex flex-row gap-2 items-center">
      <EmojiDisplay emoji={'😊'} />
      <div className="flex flex-col justify-between">
        <div className="font-sans font-bold text-gray-900 text-lg">{name}</div>
        <div className="font-sans text-gray-500 text-sm">{secondary ?? 'UP category: nothing'}</div>
      </div>
    </div>
  );
}

function PriceDisplay({ price }: { price?: number }) {
  return (
    <div className="p-2 flex flex-col justify-between">
      <div className="font-sans font-bold text-gray-900 text-lg">{price ? `$${price}` : '-'}</div>
    </div>
  );
}

function PriceInput(value: number, onChange: (value: number) => void) {
  return (
    <input
      type="number"
      className="w-full px-3 py-2 placeholder-gray-400 border border-gray-400 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      value={value}
      onChange={(e) => onChange(+e.target.value)}
    />
  );
}

export function Container({ children, edit }: { children: React.ReactNode; edit?: boolean }) {
  const [isEditing, setIsEditing] = useState(edit);

  return (
    <div
      onClick={() => setIsEditing(!isEditing)}
      className={`delay-250 ease-in-out flex flex-col gap-2 border-1 border-gray-500 px-4 py-2 shadow-md rounded-md hover:bg-gray-100/60`}
    >
      <div
        onClick={() => setIsEditing(true)}
        className="flex flex-row h-24 gap-4 content-center items-center justify-between "
      >
        {children}
      </div>
      {isEditing && <div className="h-8">Some span</div>}
    </div>
  );
}

export default BudgetItem;
