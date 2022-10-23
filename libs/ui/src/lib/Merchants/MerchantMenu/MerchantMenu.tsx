import { Button, Grid, List, ListItem, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { styled, useTheme } from '@mui/material/styles';
import { MouseEventHandler, useState } from 'react';
import useSWR, { Fetcher, KeyedMutator } from 'swr';
import { postMutation, updateLocalData } from '@up-budget/frontend-api-client';

/* eslint-disable-next-line */
export interface MerchantMenuProps {
  merchants: MerchantInfo[];
  categories: string[];
  mutator: KeyedMutator<MerchantInfo[]>;
}

export type MerchantInfo = {
  id: number;
  name: string;
  up_category: string;
  category: string;
};

const StyledList = styled(List, {
  shouldForwardProp: (prop) => prop !== 'drawerWidth',
})<StyledListProps>(({ theme }) => ({
  flexGrow: 1,
  padding: '0.2rem',
}));

interface StyledListProps {
  name?: string;
}

export function MerchantMenu({ merchants, categories, mutator }: MerchantMenuProps) {
  const theme = useTheme();

  const updateLocalMerchant = (m: MerchantInfo) => {
    const updated = updateLocalData<MerchantInfo>(merchants, m, 'id') || [];
    return updated;
  };

  return (
    <StyledList theme={theme}>
      {merchants.map((m: MerchantInfo) => {
        return (
          <MerchantMenuItem
            onUpdate={updateLocalMerchant}
            key={m.name}
            merchant={m}
            categories={categories}
            mutate={mutator}
          />
        );
      })}
    </StyledList>
  );
}

interface MerchantMenuItemProps {
  merchant: MerchantInfo;
  categories: string[];
  onUpdate: (m: MerchantInfo) => MerchantInfo[];
  mutate: KeyedMutator<MerchantInfo[]>;
}

export function MerchantMenuItem({ merchant, categories, onUpdate, mutate }: MerchantMenuItemProps) {
  const [selected, setSelected] = useState(merchant.category);

  const handleUpdate: MouseEventHandler = (event) => {
    const m: MerchantInfo = { ...merchant, category: selected };
    postMutation<MerchantInfo>(`/merchants/${merchant.id}`, m);
    mutate(onUpdate(m), false);
  };

  return (
    <ListItem>
      <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
        <Grid item xs={3}>
          <Typography display="inline">{merchant.name}</Typography>
        </Grid>

        <Grid item xs={6} textAlign={'center'}>
          <Select
            fullWidth
            id={`${merchant.name}-selection`}
            value={selected}
            onChange={(event: SelectChangeEvent<string>) => setSelected(event.target.value)}
          >
            {categories.map((category, idx) => {
              return (
                <MenuItem value={category} key={`${merchant}-${category}`}>
                  {category}
                </MenuItem>
              );
            })}
            <MenuItem value={''}></MenuItem>
          </Select>
        </Grid>
        <Grid item xs={3} textAlign={'center'}>
          <Button variant="outlined" disabled={selected === merchant.category} onClick={handleUpdate}>
            Update
          </Button>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default MerchantMenu;
