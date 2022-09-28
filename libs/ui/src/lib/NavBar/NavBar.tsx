import * as React from 'react';
import { AppBar, AppBarProps, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from '@mui/material/styles';
import { Session } from 'next-auth';
import { useSession, signIn, signOut } from "next-auth/react"

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => (prop !== 'open' && prop !== "drawerWidth"),
})<StyledAppBarProps>(({ theme, open, drawerWidth }) => ({
  height: theme.appMenu.navBarHeight,
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
  handleModal: React.MouseEventHandler
}

interface StyledAppBarProps extends AppBarProps {
  open?: boolean;
  drawerWidth: number
}

export function NavBar({ handleClick, position, open, drawerWidth, handleModal }: NavBarProps) {
  const theme = useTheme()
  const { data: session } = useSession()

  const onClick = session ?
    () => signOut() :
    handleModal

  return (
    <StyledAppBar position={position} open={open} drawerWidth={drawerWidth}>
      <Toolbar sx={{height:theme.appMenu.navBarHeight}}>
        <IconButton onClick={handleClick} sx={{position:"relative", padding:'0.25rem'}}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{flexGrow: 1,padding:'1rem'}}>
          Hello There
        </Typography>
        <Button color="inherit" onClick={onClick}>{session ? "Logout" : "Login"}</Button>
      </Toolbar>
    </StyledAppBar>
  );
}

export default NavBar;
