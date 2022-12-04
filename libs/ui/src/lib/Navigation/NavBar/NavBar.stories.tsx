import { Box, ThemeProvider } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import { NavBar, MenuItemProps, NavBarProps } from './NavBar';
import { DefaultTheme } from '../../../theme/DefaultTheme';

const meta: Meta<NavBarProps> = {
  title: 'NavBar',
  component: NavBar,
};
export default meta;

const Template: Story<Partial<NavBarProps>> = (args) => {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <Box>
        <NavBar handleClick={() => console.log('click')} handleModal={() => console.log('modal')} {...args} />
      </Box>
    </ThemeProvider>
  );
};

export const Primary = Template.bind({});

const menuItems: MenuItemProps[] = [
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
];

const WithMenu: Story<Partial<NavBarProps>> = (args) => {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <Box>
        <NavBar
          handleClick={() => console.log('click')}
          handleModal={() => console.log('modal')}
          menuItems={menuItems}
        />
      </Box>
    </ThemeProvider>
  );
};

export const WithMenuStory = WithMenu.bind({});
