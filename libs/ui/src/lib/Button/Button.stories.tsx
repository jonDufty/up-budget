import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, ButtonProps } from './Button';

const Story: ComponentMeta<typeof Button> = {
  component: Button,
  title: 'Button',
};
export default Story;

const Template: ComponentStory<typeof Button> = (args) => (
  <Stack spacing={2} direction="column">
    <Button appearance="primary">Primary</Button>
    <Button appearance="secondary">Secondary</Button>
    <Button appearance="error">Error</Button>
    <Button appearance="transparent">Transparent</Button>
  </Stack>
);

// A story rendering the button as normal
export const Primary = Template.bind({});
Primary.args = {};

const SizesStory: ComponentStory<typeof Button> = (args) => (
  <Stack spacing={2} direction="row">
    <Button size="large">Large</Button>
    <Button size="medium">Medium</Button>
    <Button size="small">Small</Button>
  </Stack>
);

export const Sizes = SizesStory.bind({});
const appearances: ButtonProps['appearance'][] = ['primary', 'secondary', 'error', 'transparent'];
const StatesStory: ComponentStory<typeof Button> = (args) => (
  <Stack spacing={2} direction="column">
    {appearances.map((appearance) => (
      <>
        <Typography>{appearance}</Typography>
        <Stack spacing={2} direction="row">
          <Button appearance={appearance}>Active</Button>
          <Button appearance={appearance} disabled>
            Disabled
          </Button>
          <Button selected appearance={appearance}>
            Selected
          </Button>
        </Stack>
      </>
    ))}
  </Stack>
);

export const States = StatesStory.bind({});
