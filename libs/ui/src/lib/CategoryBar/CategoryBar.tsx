import {
  Button,
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
import { useState } from 'react';

/* eslint-disable-next-line */
export interface CategoryBarProps {
  merchants: MerchantInfo[];
  categories: string[];
}

export type MerchantInfo = {
  name: string;
  upCategory: string;
  category: string | null;
};

interface CategoryBarItemProps {
  merchant: MerchantInfo;
  categories: string[];
}

const StyledList = styled(List, {
  shouldForwardProp: (prop) => prop !== 'drawerWidth',
})<StyledListProps>(({theme}) => ({
  flexGrow: 1,
  padding: '0.2em',


}));

interface StyledListProps {
  name?: string;
}

export function CategoryBar({ merchants, categories }: CategoryBarProps) {
  const theme = useTheme()

  return (
    <StyledList theme={theme}>
      {merchants.map((m: MerchantInfo) => {
        return <CategoryBarItem merchant={m} categories={categories} />;
      })}
    </StyledList>
  );
}

export function CategoryBarItem({
  merchant,
  categories,
}: CategoryBarItemProps) {
  const [selected, setSelected] = useState(merchant.category);

  return (
    <ListItem key={merchant.name}>
      <Grid container spacing={2} justifyItems={'center'}>
        <Grid xs={3}>
          <Typography display="inline">{merchant.name}</Typography>
        </Grid>

        <Grid xs={6}>
          <Select
            fullWidth
            id={`${merchant.name}-selection`}
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
            <MenuItem value={undefined}></MenuItem>
          </Select>
        </Grid>
        <Grid xs={3}>
            <Button
              variant="outlined"
              disabled={selected === merchant.category}
            >
              Update
            </Button>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default CategoryBar;
