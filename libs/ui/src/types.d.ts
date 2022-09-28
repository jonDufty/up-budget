import { Theme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    appMenu: {
      drawerWidth: number;
      navBarHeight: number;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    appMenu?: {
      drawerWidth?: number;
      navBarHeight?: number;
    };
  }
}
