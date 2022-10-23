import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MenuItem } from './Menu';

export default {
  component: MenuItem,
  title: 'MenuItem',
} as ComponentMeta<typeof MenuItem>;

const Template: ComponentStory<typeof MenuItem> = (args) => (
  <MenuItem {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
