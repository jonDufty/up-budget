import styled from '@emotion/styled';
import {
  AppBar,
  Box,
  Drawer,
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

/* eslint-disable-next-line */
export interface MenuProps {
  items: MenuItemProps[];
}

const StyledMenu = styled.div`
  color: pink;
`;

export function Menu({ items }: MenuProps) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer open={true} anchor="left" variant="persistent">
      <List>
        {items.map((item: MenuItemProps) => {
          return <MenuItem {...item} />;
        })}
      </List>
    </Drawer>
  );
}

export default Menu;
