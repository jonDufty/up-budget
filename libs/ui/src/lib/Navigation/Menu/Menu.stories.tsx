import { Box, Divider, ThemeProvider } from '@mui/material';
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
