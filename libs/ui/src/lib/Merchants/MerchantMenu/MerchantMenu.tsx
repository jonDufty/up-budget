import {
  Button,
  capitalize,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { styled, useTheme } from '@mui/material/styles';
import { MouseEventHandler, useState } from 'react';
import useSWR, { Fetcher } from 'swr'

/* eslint-disable-next-line */
export interface CategoryBarProps {
  merchants: MerchantInfo[];
  categories: string[];
  onUpdate: (m: MerchantInfo) => MerchantInfo[];
}

export type MerchantInfo = {
  id: number
  name: string;
  up_category: string;
  category: string;
};

interface CategoryBarItemProps {
  merchant: MerchantInfo;
  categories: string[];
  key?: string
  onUpdate: (m: MerchantInfo) => MerchantInfo[]
}

const StyledList = styled(List, {
  shouldForwardProp: (prop) => prop !== 'drawerWidth',
})<StyledListProps>(({theme}) => ({
  flexGrow: 1,
  padding: '0.2rem',
}));

interface StyledListProps {
  name?: string;
}

export function MerchantMenu({ merchants, categories, onUpdate }: CategoryBarProps) {
  const theme = useTheme()

  return (
    <StyledList theme={theme}>
      {merchants.map((m: MerchantInfo) => {
        return <MerchantMenuItem onUpdate={onUpdate} key={m.name} merchant={m} categories={categories} />;
      })}
    </StyledList>
  );
}

const API_URL = 'https://api.budget-dev.jdufty.com';

const updateMerchant = async (merchant: MerchantInfo) => {
  const apiUrl = `${API_URL}/merchants/${merchant.id}`;
  console.log(`Sending to ${apiUrl}`);
  const res = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({
      category: merchant.category,
    }),
  });

  console.log('Updating ...');

  if (!res.ok) {
    throw new Error(`error updating data ${res.statusText}`);
  }
};

export function MerchantMenuItem({
  merchant,
  categories,
  key,
  onUpdate
}: CategoryBarItemProps) {
  const [selected, setSelected] = useState(merchant.category);
  const { mutate, error } = useSWR('/merchants')

  const handleUpdate: MouseEventHandler = (event) => {
    const m: MerchantInfo = { ...merchant, category: selected }
    updateMerchant(m);
    const newMerchants = onUpdate(m)
    console.log(newMerchants);
    mutate(newMerchants, false);
  };

  return (
    <ListItem key={key}>
      <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
        <Grid item xs={3}>
          <Typography display="inline">{merchant.name}</Typography>
        </Grid>

        <Grid item xs={6} textAlign={'center'}>
          <Select
            fullWidth
            id={`${merchant.name}-selection`}
            value={capitalise(selected)}
            onChange={(event: SelectChangeEvent<string>) =>
              setSelected(event.target.value)
            }
          >
            {categories.map((category, idx) => {
              return (
                <MenuItem value={category} key={`${merchant}-${category}`}>
                  {category}
                </MenuItem>
              );
            })}
            <MenuItem value={""}></MenuItem>
          </Select>
        </Grid>
        <Grid item xs={3} textAlign={'center'}>
            <Button
              variant="outlined"
            disabled={selected === merchant.category}
            onClick={handleUpdate}
            >
              Update
            </Button>
        </Grid>
      </Grid>
    </ListItem>
  );
}

function capitalise(text: string): string {
  const words = text.split('-');
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}


export default MerchantMenu;
