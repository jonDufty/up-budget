import { Box, Divider, ThemeProvider } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import { Menu, MenuItemProps, MenuProps } from './Menu';
import { DefaultTheme } from '../../../theme/DefaultTheme';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import SavingsIcon from '@mui/icons-material/Savings';

const meta: Meta<MenuItemProps> = {
  title: 'Menu',
  component: Menu,
};
export default meta;

const Template: Story<MenuProps> = (args) => {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 'fit-content',
        }}
      >
        <Menu {...args}/>
        <Divider   variant='middle' orientation="vertical" flexItem />
        <Box marginLeft={2} padding={2}>Content</Box>
      </Box>
    </ThemeProvider>
  );
};

const items = [
  {
    linkTo: '/',
    name: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    linkTo: '/',
    name: 'Merchants',
    icon: <AddBusinessIcon />,
  },
  {
    linkTo: '/',
    name: 'Budgets',
    icon: <SavingsIcon />,
  },
];

export const Open = Template.bind({});
Open.args = {
  compact: true,
  items
};

export const Closed = Template.bind({});
Closed.args = {
  compact: false,
  items
};
