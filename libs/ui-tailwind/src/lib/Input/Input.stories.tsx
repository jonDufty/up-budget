import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { Input, InputProps } from './Input';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Input',
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Place = {
  args: {
    // label: 'Price',
    id: 'price',
    type: 'text',
  },
};

export const WithLabel = {
  args: {
    label: 'Price',
    id: 'price',
    placeholder: '0.00',
    type: 'number',
  },
};

export const WithPrefix = {
  args: {
    label: 'Price',
    id: 'price',
    placeholder: '0.00',
    type: 'number',
    prefix: '$',
  },
};

export const WithContainer: StoryFn<InputProps> = (args: InputProps) => (
  <div className="w-1/2">
    <Input {...args} />
  </div>
);
WithContainer.args = {
  label: 'Price',
  id: 'price',
  type: 'text',
};
