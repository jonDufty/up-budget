import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container } from '@mui/system';
import { styled, useTheme } from '@mui/material/styles';
import { MouseEventHandler, useState } from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { capitaliseApiString, postMutation, updateLocalData, UpdateLocalOptions } from '@up-budget/frontend-api-client';

export interface BudgetMenuProps {
  budgets: BudgetInfo[];
  mutate: KeyedMutator<BudgetInfo[]>
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

const StyledList = styled(List, {
  shouldForwardProp: (prop) => prop !== 'drawerWidth',
})<StyledListProps>(({ theme }) => ({
  flexGrow: 1,
  padding: '0.2rem',
}));

interface StyledListProps {
  name?: string;
}

export function BudgetMenu({ budgets }: BudgetMenuProps) {
  const theme = useTheme();

  const updateLocalBudget = (b: BudgetInfo, options?: UpdateLocalOptions) => {
    return updateLocalData<BudgetInfo>(budgets, b, "category", options)
  }

  return (
    <StyledList theme={theme}>
      {budgets.map((b: BudgetInfo) => {
        return <BudgetMenuItem onUpdate={updateLocalBudget} key={b.category} budget={b} />;
      })}
    </StyledList>
  );
}

export function BudgetMenuItem({ budget, onUpdate }: BudgetMenuItemProps) {
  const [limit, setLimit] = useState(budget.limit);
  const [id, setId] = useState(budget.id);
  const key = budget.category;
  const { mutate, error } = useSWR('/budgets');

  const handleDelete: MouseEventHandler = (event) => {
    postMutation<BudgetInfo>(`/budgets/${budget.id}`, budget, {method: 'DELETE'})
    mutate(onUpdate(budget, {delete: true}), false);
  };

  const handleUpdate: MouseEventHandler = (event) => {
    postMutation<BudgetInfo>(`/budgets/${budget.id}`, budget)
    mutate(onUpdate(budget), false);
  };

  return (
    <ListItem key={key}>
      <Grid container spacing={2} justifyContent={'center'} alignItems={'center'} key={`${key}-grid`}>
        <Grid item xs={3}>
          <Typography key={`${key}-text`} display="inline">
            {capitaliseApiString(budget.category)}
          </Typography>
        </Grid>

        <Grid item xs={5} textAlign={'center'}>
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
        </Grid>
        <Grid item xs={3} textAlign={'center'}>
          <Button key={`${key}-button`} variant="outlined" onClick={handleUpdate} disabled={limit === budget.limit}>
            Update {error && 'ERROR'}
          </Button>
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={handleDelete} color="error">
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default BudgetMenu;
