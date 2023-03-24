import { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultTheme } from '@up-budget/ui';
import { Box } from '@mui/system';
import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import { AppMenu } from '../components/AppMenu/AppMenu';
import { Session } from 'next-auth';
import { Roboto } from '@next/font/google';

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

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

function CustomApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <>
      <Head>
        <title>Welcome to budget-app!</title>
      </Head>
      <main className={roboto.className}>
        <SessionProvider session={pageProps.session}>
          <ThemeProvider theme={DefaultTheme}>
            <Box>
              <AppMenu menuItems={MenuItems}>
                <Component {...pageProps} />
              </AppMenu>
            </Box>
          </ThemeProvider>
        </SessionProvider>
      </main>
    </>
  );
}

export default CustomApp;
