import { AppProps } from 'next/app';
import Head from 'next/head';
import { Menu, NavBar } from '@up-budget/ui';
import { Box } from '@mui/system';
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

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to budget-app!</title>
      </Head>

      <Box>
        <AppMenu menuItems={MenuItems}>
          <Component {...pageProps} />
        </AppMenu>
      </Box>
    </>
  );
}

export default CustomApp;
