import * as React from 'react';
import { AppBar, AppBarProps, Box, Button, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import Link from 'next/link';

export interface NavBarProps extends AppBarProps {
  handleClick: React.MouseEventHandler;
  session: Session | null;
  menuItems?: MenuItemProps[];
  handleModal: React.MouseEventHandler;
}

export interface MenuItemProps {
  linkTo: string;
  name: string;
}

export function NavBar({ session, handleModal, menuItems }: NavBarProps) {
  const theme = useTheme();

  const onClick = session ? () => signOut() : handleModal;

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ height: theme.appMenu.navBarHeight }}>
        <Typography variant="h6" sx={{ padding: '1rem' }}>
          Up Budget
        </Typography>
        {menuItems &&
          menuItems.map((item) => (
            <Link key={item.name} href={item.linkTo}>
              <Button color="inherit" key={item.name}>
                {item.name}
              </Button>
            </Link>
          ))}
        <Box flexGrow={1} />
        <Box flexGrow={0}>
          <Button color="inherit" onClick={onClick}>
            {session ? 'Logout' : 'Login'}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
