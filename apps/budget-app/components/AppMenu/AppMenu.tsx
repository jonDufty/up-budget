import { Box } from '@mui/material';
import { Menu, MenuItemProps, NavBar } from '@up-budget/ui';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';

// import styled from 'styled-components';

export interface AppMenuProps {
  menuItems: MenuItemProps[];
  children: React.ReactNode;
}

const drawerWidth = 240;
const navBarHeight = 50;

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open'
})<{  open?: boolean; }>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginTop: navBarHeight,
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  }),
}));



export function AppMenu({ menuItems, children }: AppMenuProps) {
  const [open, setOpen] = React.useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <NavBar
        handleClick={handleToggleDrawer}
        position="fixed"
        open={open}
        drawerWidth={drawerWidth}
      ></NavBar>
      <Menu open={open} items={menuItems} drawerWidth={drawerWidth}></Menu>
      <Main open={open}>
        {children}
      </Main>
    </Box>
  );
}

export default AppMenu;
