import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BudgetMenu } from './BudgetMenu';

export default {
  component: BudgetMenu,
  title: 'BudgetMenu',
} as ComponentMeta<typeof BudgetMenu>;

const Template: ComponentStory<typeof BudgetMenu> = (args) => <BudgetMenu {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  budgets: [
    {
      category: 'groceries',
      limit: 100,
      id: 1,
    },
    {
      category: 'technology',
      id: 2,
    },
  ],
};
