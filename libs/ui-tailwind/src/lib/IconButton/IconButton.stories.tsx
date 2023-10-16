import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { TextAlignCenterIcon } from '@radix-ui/react-icons';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: 'IconButton',
};
export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary = {
  args: {
    icon: <TextAlignCenterIcon />
  },
};

