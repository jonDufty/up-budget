import { Box } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import { NavBar, NavBarProps } from './NavBar';

const meta: Meta<NavBarProps> = {
  title: 'NavBar',
  component: NavBar,
};
export default meta;

const Template: Story<NavBarProps> = (args) => {
  return (
    <Box>
      <NavBar {...args} />
    </Box>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
