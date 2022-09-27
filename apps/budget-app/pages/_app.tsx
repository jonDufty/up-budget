import { AppProps } from 'next/app';
import Head from 'next/head';
import { Menu, NavBar } from '@up-budget/ui';
import { Box } from '@mui/system';
import './styles.css';
import { styled } from '@mui/material/styles';
import AppMenu from '../components/AppMenu/AppMenu';

const MenuItems = [
  {
    linkTo: '/merchants',
    name: 'Merchants',
  },
  {
    linkTo: '/budgets',
    name: 'Budgets',
  },
  {
    linkTo: '/dashboard',
    name: 'Dashboard',
  },
];

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  }),
}));

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to budget-app!</title>
      </Head>

      <Box>
        <AppMenu menuItems={MenuItems}>
          <Main open={false}>
            <Component {...pageProps} />
          </Main>
        </AppMenu>
      </Box>
    </>
  );
}

export default CustomApp;
