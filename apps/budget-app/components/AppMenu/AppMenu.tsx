import { Box } from '@mui/material';
import { MenuItemProps, NavBar } from '@up-budget/ui';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import { LoginModal } from '@up-budget/ui';

export interface AppMenuProps {
  menuItems: MenuItemProps[];
  children: React.ReactNode;
}

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginTop: theme.appMenu.navBarHeight,
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: theme.appMenu.drawerWidth,
  }),
}));

export function AppMenu({ menuItems, children }: AppMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const { data: session } = useSession();
  const theme = useTheme();

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <Box>
      <NavBar
        handleClick={handleToggleDrawer}
        handleModal={handleModalOpen}
        menuItems={menuItems}
        session={session}
      ></NavBar>
      <Main open={open}>{children}</Main>
      <LoginModal open={openModal} onClose={handleModalClose} />
    </Box>
  );
}

export default AppMenu;
