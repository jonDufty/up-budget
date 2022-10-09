import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CategoryBar } from './CategoryBar';

export default {
  component: CategoryBar,
  title: 'CategoryBar',
} as ComponentMeta<typeof CategoryBar>;

const Template: ComponentStory<typeof CategoryBar> = (args) => (
  <CategoryBar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  merchants: [
    {
      name: "Bunnings",
      up_category: "home stuff",
      category: null
    },
    {
      name: "Woolies",
      up_category: "groceries",
      category: "food"
    },
  ],
  categories: [
    "home",
    "food",
    "drinks",
    "other"
  ]
};
