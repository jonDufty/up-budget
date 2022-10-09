import {
  Button,
  Grid,
  InputAdornment,
  List,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { styled, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import useSWR, { Fetcher } from 'swr';
import test from 'node:test';

export interface BudgetMenuProps {
  budgets: BudgetInfo[];
}

interface BudgetInfo {
  category: string;
  limit?: number;
  id?: number;
}

interface BudgetMenuItemProps {
  budget: BudgetInfo;
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

  return (
    <StyledList theme={theme}>
      {budgets.map((b: BudgetInfo) => {
        return <BudgetMenuItem key={b.category} budget={b} />;
      })}
    </StyledList>
  );
}

export function BudgetMenuItem({ budget }: BudgetMenuItemProps) {
  const [limit, setLimit] = useState(budget.limit);
  const key = budget.category

  return (
    <ListItem key={key}>
      <Grid container spacing={2} justifyContent={'center'} alignItems={'center'} key={`${key}-grid`}>
        <Grid item xs={3}>
          <Typography key={`${key}-text`} display="inline">{captilise(budget.category)}</Typography>
        </Grid>

        <Grid item xs={6} textAlign={'center'}>
          <TextField key={`${key}-input`}
            fullWidth
            margin='normal'
            id={`${budget.category}-budget-limit`}
            label="Limit"
            variant="outlined"
            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment>}}
            type="number"
            value={limit}
            onChange={(e) => {
              setLimit(+e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={3} textAlign={'center'}>
          <Button key={`${key}-button`}
            variant="outlined" disabled={limit === budget.limit}>
            Update
          </Button>
        </Grid>
      </Grid>
    </ListItem>
  );
}

function captilise(text: string): string {
  const words = text.split(' ');
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default BudgetMenu;
