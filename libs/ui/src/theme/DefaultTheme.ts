import { createTheme, ThemeOptions } from '@mui/material/styles';
import "@fontsource/open-sans"

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Open Sans',
  },
  appMenu: {
    drawerWidth: 240,
    navBarHeight: 70,
  }
};

export const DefaultTheme = createTheme(themeOptions);
