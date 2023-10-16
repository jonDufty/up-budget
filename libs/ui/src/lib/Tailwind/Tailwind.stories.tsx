import type { Meta, StoryObj } from '@storybook/react';
import { Tailwind } from './Tailwind';

const meta: Meta<typeof Tailwind> = {
  component: Tailwind,
  title: 'Tailwind',
};
export default meta;
type Story = StoryObj<typeof Tailwind>;

export const Primary = {
  args: {},
};
