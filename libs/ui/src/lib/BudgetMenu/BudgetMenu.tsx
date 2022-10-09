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
  key?: string;
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
        return <BudgetMenuItem budget={b} />;
      })}
    </StyledList>
  );
}

export function BudgetMenuItem({ budget, key }: BudgetMenuItemProps) {
  const [limit, setLimit] = useState(budget.limit);

  return (
    <ListItem key={budget.category}>
      <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
        <Grid xs={3}>
          <Typography display="inline">{captilise(budget.category)}</Typography>
        </Grid>

        <Grid xs={6} textAlign={'center'}>
          <TextField
            fullWidth
            margin='normal'
            id={`${budget.category}-budget-limit`}
            label="Limit"
            variant="outlined"
            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment>}}
            // startAdornment=
            type="number"
            value={limit}
            onChange={(e) => {
              setLimit(+e.target.value);
            }}
          />
        </Grid>
        <Grid xs={3} textAlign={'center'}>
          <Button variant="outlined" disabled={limit === budget.limit}>
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
