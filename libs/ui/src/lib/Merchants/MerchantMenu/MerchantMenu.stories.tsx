import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MerchantMenu } from './MerchantMenu';

export default {
  component: MerchantMenu,
  title: 'CategoryBar',
} as ComponentMeta<typeof MerchantMenu>;

const Template: ComponentStory<typeof MerchantMenu> = (args) => <MerchantMenu {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  merchants: [
    {
      id: 1,
      name: 'Bunnings',
      up_category: 'home stuff',
      category: '',
    },
    {
      id: 2,
      name: 'Woolies',
      up_category: 'groceries',
      category: 'food',
    },
  ],
  categories: ['home', 'food', 'drinks', 'other'],
};
