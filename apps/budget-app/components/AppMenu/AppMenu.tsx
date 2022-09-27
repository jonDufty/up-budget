import { Box } from '@mui/material';
import { Menu, MenuItemProps, NavBar } from '@up-budget/ui';
import * as React from 'react';
// import styled from 'styled-components';


export interface AppMenuProps {
  menuItems: MenuItemProps[];
  children: React.ReactNode;
}

const drawerWidth = 240;

export function AppMenu({ menuItems }: AppMenuProps) {
  const [open, setOpen] = React.useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <NavBar
        handleClick={handleToggleDrawer}
        position='fixed'
        open={open}
        drawerWidth={drawerWidth}
      ></NavBar>
      <Menu open={open} items={menuItems} drawerWidth={drawerWidth}></Menu>
    </Box>
  );
}

export default AppMenu;
