import * as React from 'react';
import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// import { Button } from '../../Button/Button';
import { MenuBook } from '@mui/icons-material';
import { useState } from 'react';
import Link from 'next/link';
import { CSSObject, styled } from '@mui/material/styles';
import { colors } from '../../settings/colors';
import { borderRadius, buttonHeights } from '../../settings/sizes';

export interface MenuItemProps {
  linkTo: string;
  name: string;
  icon?: React.ReactNode;
  selected?: boolean;
  open?: boolean;
}

export interface MenuProps {
  items: MenuItemProps[];
  open: boolean;
}

const StyledIcon = styled(ListItemIcon)<{ selected: boolean }>(({ selected }) => ({
  backgroundColor: 'transparent',
  color: colors.primary[600],
  '&:hover': {
    backgroundColor: colors.primary[100],
  },
  '&.Mui-disabled': {
    backgroundColor: colors.primary[100],
  },
  ...(selected && {
    backgroundColor: colors.primary[300],
  }),
  // Make click area rounded square instead of circle
  borderRadius: borderRadius.medium,
}));

const StyledDrawer = styled(List, { shouldForwardProp: (prop) => prop !== 'open' })<{ open: boolean }>(
  ({ open, theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '200px',
    // Ease transition between open and non-open
    ...(open && {
      ...openedMixin(),
      // '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(),
      // '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

const FallbackIcon = () => <MenuBook htmlColor={colors.primary[600]} />;

export function Menu({ items, open }: MenuProps) {
  const [selected, setSelected] = useState(items[0]?.name || '');
  const [menuopen, setMenuopen] = useState(open);

  return (
      <StyledDrawer open={open}>
        {items.map((item, idx) => (
          <Link href={item.linkTo} passHref style={{ textDecoration: 'none' }}>
            <ListItem key={item.name} onClick={() => setSelected(item.name)} sx={{ width: '200px', padding: '4px' }}>
              <MenuItem {...item} key={item.name} selected={item.name === selected} open={open} />
            </ListItem>
          </Link>
        ))}
      </StyledDrawer>
  );
}

const StyledListButton = styled(ListItemButton)<{ selected?: boolean, open: boolean }>(({ selected, open }) => ({
  width: '200px',
  height: buttonHeights['large'],
  display: 'flex',
  justifyContent: 'flex-start',
  // Same appearance as transparent Button
  backgroundColor: 'transparent',
  color: colors.primary[600],
  '&:hover': {
    backgroundColor: colors.primary[100],
  },
  '&.Mui-disabled': {
    backgroundColor: colors.primary[100],
  },
  // Make click area rounded square instead of circle
  borderRadius: borderRadius.medium,
  // Mui selected change background color
  '&.Mui-selected': {
    backgroundColor: colors.primary[200],
  },
  ...(!open && {
    width: '60px',
    justifyContent: 'center',

    // '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const MenuItem = ({ linkTo, name, icon, selected, open }: MenuItemProps) => {
  return (
    <StyledListButton open selected={selected}>
      <ListItemIcon sx={{
        width: '30px'
      }}>{icon}</ListItemIcon>
      {/* <ListItemText primary={name} sx={{opacity: open ? 1 : 0}} /> */}
      {open && <ListItemText primary={name} /> }
    </StyledListButton>
  );
};

const drawerWidth = 200;

const openedMixin = (): CSSObject => ({
  width: `${drawerWidth}px`,
  transition: 'width 0.2s ease-in-out',
  // overflowX: 'hidden',
});

const closedMixin = (): CSSObject => ({
  // overflowX: 'hidden',
  transition: 'width 0.2s ease-in-out',
  width: `60px`,
});
