import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup } from './ToggleGroup';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { TextAlignLeftIcon } from '@radix-ui/react-icons';

const meta: Meta<typeof ToggleGroup> = {
  component: ToggleGroup,
  title: 'ToggleGroup',
};
export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Primary = {
  args: {
    items: [
      {
        component: <div>AA</div>,
        value: 'text',
        label: 'text',
      }
    ]
  },
};

export const LongText = {
  args: {
    items: [
      {
        component: "Something long",
        value: 'text',
        label: 'text',
      },
      {
        component: "Something else long",
        value: 'text2',
        label: 'text2',
      }
    ]
  },
};
