import { Container, Stack } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SwitchButton } from './SwitchButton';

const Story: ComponentMeta<typeof SwitchButton> = {
  component: SwitchButton,
  title: 'SwitchButton',
};
export default Story;

const Template: ComponentStory<typeof SwitchButton> = (args) => (
  <Container>
    <SwitchButton {...args} />
  </Container>
);

export const Primary = Template.bind({});
Primary.args = {
  size: 'medium',
  inactive: 'All Merchants',
  active: 'Uncategorised',
  onClick: () => {
    return;
  },
};

const SizesTemplate: ComponentStory<typeof SwitchButton> = (args) => (
  <Stack direction='column' spacing={2}>
    <SwitchButton size='small' {...args} />
    <SwitchButton size='medium' {...args} />
    <SwitchButton size='large' {...args} />
  </Stack>
);

export const Sizes = SizesTemplate.bind({});
Sizes.args = {
  inactive: 'Option 1',
  active: 'Option 2',
  onClick: () => {
    return;
  }
};
