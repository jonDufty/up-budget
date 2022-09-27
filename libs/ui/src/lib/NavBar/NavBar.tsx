import * as React from 'react'
import { AppBar, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'

/* eslint-disable-next-line */
export interface NavBarProps {}

export function NavBar(props: NavBarProps) {
  return (
    <AppBar>
      <Toolbar>
      <IconButton> <MenuIcon/></IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
