import { AppProps } from 'next/app';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import { DefaultTheme } from '@up-budget/ui';
import { Box } from '@mui/system';
import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import { AppMenu } from '../components/AppMenu/AppMenu';
import { Session } from 'next-auth';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import 'tailwindcss/tailwind.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

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

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

function CustomApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        <title>Welcome to budget-app!</title>
      </Head>
      <main className={`${inter.variable} font-sans`}>

      <SessionProvider session={pageProps.session}>
        <ThemeProvider theme={DefaultTheme}>
          <ApolloProvider client={client}>
            <Box>
              <AppMenu menuItems={MenuItems}>
                <Component {...pageProps} />
              </AppMenu>
            </Box>
          </ApolloProvider>
        </ThemeProvider>
      </SessionProvider>
      </main>
    </>
  );
}

export default CustomApp;
