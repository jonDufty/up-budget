import { Drawer, DrawerProps, List } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { ListItem, ListItemBaseProps, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Link from 'next/link';

export interface MenuProps {
  items: MenuItemProps[];
  open: boolean;
  drawerWidth: number;
}

interface StyledDrawerProps extends DrawerProps {
  drawerWidth: number;
}

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'drawerWidth',
})<StyledDrawerProps>(({ drawerWidth }) => ({
  width: drawerWidth,
  marginLeft: `${drawerWidth}px`,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

export function Menu({ items, open, drawerWidth }: MenuProps) {
  return (
    <StyledDrawer drawerWidth={drawerWidth} open={open} anchor="left" variant="persistent">
      <List>
        {items.map((item: MenuItemProps) => {
          return <MenuItem key={item.name} {...item} />;
        })}
      </List>
    </StyledDrawer>
  );
}

export interface MenuItemProps extends ListItemBaseProps {
  linkTo: string;
  name: string;
}

export const MenuItem = ({ linkTo, name }: MenuItemProps) => {
  return (
    <Link href={linkTo} passHref>
      <ListItem key={name} disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <MenuIcon />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default Menu;
