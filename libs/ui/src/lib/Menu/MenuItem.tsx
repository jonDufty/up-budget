import styled from '@emotion/styled';
import {
  ListItem,
  ListItemBaseProps,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Link from 'next/link';
import * as React from 'react';

/* eslint-disable-next-line */
export interface MenuItemProps extends ListItemBaseProps {
  linkTo: string;
  name: string;
}

const StyledMenuItem = styled.div`
  color: red;
`;

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
}

export default MenuItem;
