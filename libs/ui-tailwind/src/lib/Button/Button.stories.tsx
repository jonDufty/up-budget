import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import { Button } from './Button';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary = {
  args: {
    children: 'Primary Button',
  },
};

export const All: StoryFn = (args) => (
    <div className='flex flex-col space-y-2'>
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
    <Button {...args} variant="tertiary">Tertiary</Button>
    <Button {...args} variant="disabled">Disabled</Button>
    </div>
);

export const Sizes: StoryFn = (args) => (
  <div className='flex flex-col space-y-2'>
    <Button {...args} variant="primary" size="small">Small</Button>
    <Button {...args} variant="primary" size="medium">Medium</Button>
    <Button {...args} variant="primary" size="large">Large</Button>
  </div>
);

export const Heading: Story = {
  args: {
    children: 'Primary Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Primary Button/gi)).toBeTruthy();
  },
};
