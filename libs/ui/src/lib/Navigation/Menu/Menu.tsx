import * as React from 'react';
import { List, ListItem } from '@mui/material';
import { ButtonToggle } from '../../Button/Button';
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
  const [selected, setSelected] = useState(0);

  return (
    <List>
      {items.map((item, idx) => (
        <ListItem sx={{ padding: '4px' }}>
          <ButtonToggle
            selected={idx === selected}
            appearance="transparent"
            startIcon={<MenuBook />}
            value={item.name}
            key={item.name}
          >
            {item.name}
          </ButtonToggle>
        </ListItem>
      ))}
    </List>
  );
}
