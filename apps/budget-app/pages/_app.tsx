import { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultTheme } from '@up-budget/ui';
import { Box } from '@mui/system';
import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import { AppMenu } from '../components/AppMenu/AppMenu';
import { Session } from 'next-auth';

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

function CustomApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <>
      <Head>
        <title>Welcome to budget-app!</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider theme={DefaultTheme}>
          <Box>
            <AppMenu menuItems={MenuItems}>
              <Component {...pageProps} />
            </AppMenu>
          </Box>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default CustomApp;
