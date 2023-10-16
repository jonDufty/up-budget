import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { SelectMenu, SelectMenuProps } from './SelectMenu';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof SelectMenu> = {
  component: SelectMenu,
  title: 'SelectMenu',
};
export default meta;
type Story = StoryObj<typeof SelectMenu>;

export const Primary = {
  args: {
    items: ['item 1', 'item 2', 'item 3', 'item 4'],
  },
};

export const FullWidth: StoryFn = (args) => (
  <div className="w-1/2">
    <SelectMenu items={['item 1', 'item 2', 'item 3', 'item 4']} fullWidth={true} />
  </div>
);
FullWidth.args = {
  args: {
    items: ['item 1', 'item 2', 'item 3', 'item 4'],
  },
};
