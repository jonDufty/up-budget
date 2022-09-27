import * as React from 'react';
import { AppBar, AppBarProps, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from '@mui/material/styles';
// import styled from 'styled-components';

// const drawerWidth = 240;

// const StyledAppBar = styled(AppBar)`
//   width: 600,
//   marginLeft: ${drawerWidth}
// `;

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<StyledAppBarProps>(({ theme, open, drawerWidth }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export interface NavBarProps extends AppBarProps{
  handleClick: React.MouseEventHandler;
  open: boolean
  drawerWidth: number
}

interface StyledAppBarProps extends AppBarProps {
  open?: boolean;
  drawerWidth: number
}

export function NavBar({ handleClick, position, open, drawerWidth }: NavBarProps) {
  return (
    <StyledAppBar position={position} open={open} drawerWidth={drawerWidth}>
      <Toolbar>
        <IconButton onClick={handleClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" noWrap component="div">Hello There</Typography>
      </Toolbar>
    </StyledAppBar>
  );
}

export default NavBar;
