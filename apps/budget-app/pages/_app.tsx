import { AppProps } from 'next/app';
import Head from 'next/head';
import { Menu, NavBar, DefaultTheme} from '@up-budget/ui';
import { Box } from '@mui/system';
import { styled, ThemeProvider } from '@mui/material/styles';
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
      <ThemeProvider theme={DefaultTheme}>
      <Box>

        <AppMenu menuItems={MenuItems}>
          <Component {...pageProps} />
        </AppMenu>
      </Box>
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
