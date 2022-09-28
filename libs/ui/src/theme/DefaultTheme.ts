import { createTheme, ThemeOptions } from '@mui/material/styles';


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
    navBarHeight: 50,
  }
};

export const DefaultTheme = createTheme(themeOptions);
