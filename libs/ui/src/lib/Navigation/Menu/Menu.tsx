import * as React from 'react';
import { AppBar, AppBarProps, Box, List, ListItem, ListItemButton, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import Link from 'next/link';
import Button from '../../Button/Button';
import { MenuBook } from '@mui/icons-material';
import { useState } from 'react';

export interface MenuItemProps {
  linkTo: string;
  name: string;
  icon?: React.ReactElement;
}

export interface MenuProps {
  items: MenuItemProps[];
}

export function Menu({ items }: MenuProps) {
  const [selected, setSelected] = useState(0)

  return (
    <List>
      {items.map((item,) => (
        <ListItem sx={{padding: "4px"}}>
          <Button appearance='transparent' startIcon={<MenuBook />} key={item.name}>{item.name}</Button>
        </ListItem>
      ))}
    </List>
  );
}
