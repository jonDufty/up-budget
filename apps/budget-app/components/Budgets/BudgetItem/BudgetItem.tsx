import { Button, Grid, IconButton, InputAdornment, ListItem, TextField, Typography } from '@mui/material';
import { Button as NewButton, IconButton as NewIconButton } from '@up-budget/ui-tailwind';
import { Cross2Icon } from '@radix-ui/react-icons';

function MyComponent() {
  return (
    <div>
      <FaceIcon />
      <SunIcon />
      <ImageIcon />
    </div>
  );
}
import React, { MouseEventHandler, useState } from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { capitaliseApiString, postMutation, updateLocalData, UpdateLocalOptions } from '@up-budget/api-schema';
import { Input } from '@up-budget/ui-tailwind';

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
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete: MouseEventHandler = (event) => {
    postMutation<BudgetInfo>(`/budgets/${budget.id}`, budget, { method: 'DELETE' });
    mutate(onUpdate(budget, { delete: true }), false);
  };

  const handleUpdate: MouseEventHandler = (event) => {
    postMutation<BudgetInfo>(`/budgets/${budget.id}`, budget);
    mutate(onUpdate(budget), false);
  };

  return (
    <Container onClick={() => setIsEditing(!isEditing)}>
      {isEditing && (
        <div className="absolute top-3 right-3 pr-3 pt-3">
          <NewIconButton icon={<Cross2Icon />} />
        </div>
      )}
      <div className="flex flex-row h-24 gap-4 content-center items-center justify-between ">
        {!isEditing ? (
          <NameDisplay name={capitaliseApiString(budget.category)} secondary={'pubs and bars'} />
        ) : (
          <Input
            label="Name"
            id="name"
            placeholder={capitaliseApiString(budget.category)}
            onChange={() => null}
            type="text"
          />
        )}

        {!isEditing ? (
          <PriceDisplay price={budget.limit} />
        ) : (
          <Input
            label="Price"
            id="price"
            placeholder={budget.limit?.toString()}
            onChange={() => null}
            type="number"
            prefix="$"
          />
        )}
      </div>
      {isEditing && (
        <div className="flex flex-row gap-6 content-center items-center justify-center">
          <NewButton variant="primary" size="small" onClick={() => null}>
            Update
          </NewButton>
          <NewButton variant="secondary" size="small" onClick={() => null}>
            Delete
          </NewButton>
        </div>
      )}
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

function NameDisplay({ name, secondary, edit }: { name: string; secondary?: string; edit?: boolean }) {
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

function PriceDisplay({ price, edit }: { price?: number; edit?: boolean }) {
  return (
    <div className="p-2 flex flex-col justify-between">
      <div className="font-sans font-bold text-gray-900 text-lg">{price ? `$${price}` : '-'}</div>
    </div>
  );
}

export function Container({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div
      onClick={() => {
        setIsEditing(!isEditing);
        onClick();
      }}
      className={`flex flex-col gap-2 border-1 border-gray-500 px-4 py-2 shadow-md rounded-md hover:bg-gray-100/60`}
    >
      {children}
    </div>
  );
}

export default BudgetItem;
