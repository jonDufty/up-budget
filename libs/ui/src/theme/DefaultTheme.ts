import { createTheme, ThemeOptions } from '@mui/material/styles';
import "@fontsource/open-sans"

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#64b5f6',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Open Sans',
    button: {
      textTransform: 'none'
    }
  },
  appMenu: {
    drawerWidth: 240,
    navBarHeight: 70,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        textPrimary: {
          fontFamily: 'Open Sans'
        },
      }
    }
  }

};

export const DefaultTheme = createTheme(themeOptions);
