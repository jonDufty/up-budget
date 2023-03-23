import { createTheme, ThemeOptions } from '@mui/material/styles';
import '@fontsource/open-sans';
import { colors } from '../lib/settings/colors';

export const themeOptions: ThemeOptions = {
  palette: colors,
  typography: {
    fontFamily: 'Open Sans',
    button: {
      textTransform: 'none',
    },
  },
  appMenu: {
    drawerWidth: 240,
    navBarHeight: 70,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // textPrimary: {
        //   fontFamily: 'Open Sans',
        // },
      },
    },
  },
};

export const DefaultTheme = createTheme(themeOptions);
