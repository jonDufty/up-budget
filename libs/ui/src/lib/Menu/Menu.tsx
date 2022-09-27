import {
  AppBar,
  Box,
  Drawer,
  DrawerProps,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import * as React from 'react';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { MenuItem, MenuItemProps } from './MenuItem';
import { styled, useTheme } from '@mui/material/styles';

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
