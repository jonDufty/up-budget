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
import useSWR, { Fetcher } from 'swr';
import { buildTargetFromScript } from 'nx/src/utils/package-json';

const API_URL = 'https://api.budget-dev.jdufty.com';
export interface BudgetMenuProps {
  budgets: BudgetInfo[];
}

interface BudgetInfo {
  category: string;
  limit?: number;
  id: number;
}

interface BudgetMenuItemProps {
  budget: BudgetInfo;
  onDelete: (b: BudgetInfo) => BudgetInfo[];
  onUpdate: (b: BudgetInfo) => BudgetInfo[];
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

  const removeLocalBudget = (b: BudgetInfo) => {
    const budgetsCopy = [...budgets];
    const index = budgets.findIndex((v) => v.category === b.category);
    if (index > -1) {
      budgetsCopy.splice(index, 1);
    }
    console.log(budgetsCopy);
    return budgetsCopy;
  };

  const updateLocalBudget = (b: BudgetInfo) => {
    const budgetsCopy = [...budgets];
    const index = budgets.findIndex((v) => v.category === b.category);
    if (index > -1) {
      budgetsCopy[index] = b;
    }
    console.log(budgetsCopy);
    return budgetsCopy;
  };

  return (
    <StyledList theme={theme}>
      {budgets.map((b: BudgetInfo) => {
        return <BudgetMenuItem onDelete={removeLocalBudget} onUpdate={updateLocalBudget} key={b.category} budget={b} />;
      })}
    </StyledList>
  );
}

const deleteBudget = async (budget: BudgetInfo) => {
  const apiUrl = `${API_URL}/budgets/${budget.id}`;
  console.log(`Sending to ${apiUrl}`);
  const res = await fetch(apiUrl, {
    method: 'DELETE',
  });

  console.log('Deleting ...');

  if (!res.ok) {
    throw new Error(`error updating data ${res.statusText}`);
  }
};

const updateBudget = async (budget: BudgetInfo) => {
  const apiUrl = `${API_URL}/budgets/${budget.id}`;
  console.log(`Sending to ${apiUrl}`);
  const res = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({
      category: budget.category,
      limit: budget.limit,
    }),
  });

  console.log('Updating ...');

  if (!res.ok) {
    throw new Error(`error updating data ${res.statusText}`);
  }
};

export function BudgetMenuItem({ budget, onDelete, onUpdate }: BudgetMenuItemProps) {
  const [limit, setLimit] = useState(budget.limit);
  const [id, setId] = useState(budget.id);
  const key = budget.category;
  const { mutate, error } = useSWR('/budgets');

  const handleDelete: MouseEventHandler = (event) => {
    deleteBudget(budget);
    const newBudgets = onDelete(budget);
    console.log(newBudgets);
    mutate(newBudgets, false);
  };

  const handleUpdate: MouseEventHandler = (event) => {
    const newBudget = { ...budget, limit: limit }
    updateBudget(newBudget);
    const newBudgets = onUpdate(newBudget)
    console.log(newBudgets);
    mutate(newBudgets, false);
  };

  return (
    <ListItem key={key}>
      <Grid container spacing={2} justifyContent={'center'} alignItems={'center'} key={`${key}-grid`}>
        <Grid item xs={3}>
          <Typography key={`${key}-text`} display="inline">
            {captilise(budget.category)}
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

function captilise(text: string): string {
  const words = text.split('-');
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default BudgetMenu;
