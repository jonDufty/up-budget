import { Box, ThemeProvider } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import { Menu, MenuItemProps, MenuProps } from './Menu';
import { DefaultTheme } from '../../../theme/DefaultTheme';

const meta: Meta<MenuItemProps> = {
  title: 'Menu',
  component: Menu,
};
export default meta;

const Template: Story<MenuProps> = (args) => {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <Box>
        <Menu {...args} />
      </Box>
    </ThemeProvider>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  items: [
    {
      linkTo: '/',
      name: 'item1',
    },
    {
      linkTo: '/',
      name: 'item2',
    },
    {
      linkTo: '/',
      name: 'item3',
    },
  ],
};
