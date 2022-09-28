import {
  Drawer,
  DrawerProps,
  List,
} from '@mui/material';
import * as React from 'react';
import { MenuItem, MenuItemProps } from './MenuItem';
import { styled } from '@mui/material/styles';

export interface MenuProps {
  items: MenuItemProps[];
  open: boolean
  drawerWidth: number
}

interface StyledDrawerProps extends DrawerProps{
  drawerWidth: number
}

const StyledDrawer = styled(Drawer, {})<StyledDrawerProps>(({ drawerWidth }) => ({
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
          return <MenuItem {...item} />;
        })}
      </List>
    </StyledDrawer>
  );
}

export default Menu;
