import { Box } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MenuSelector } from './MenuSelector';

const Story: ComponentMeta<typeof MenuSelector> = {
  component: MenuSelector,
  title: 'MenuSelector',
};
export default Story;

const Template: ComponentStory<typeof MenuSelector> = (args) => (
  <Box width={0.5*window.innerWidth}>
  <MenuSelector {...args} />
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {
  options: [
    'Rent',
    'Utilities',
    'Food',
    'Booze'
]
};

export const WithMaxItems = Primary.bind({})
WithMaxItems.args = {
    options: [
      'Rent',
      'Utilities',
      'Food',
      'Booze'
  ],
  maxSelected: 2
}
