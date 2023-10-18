import { Meta, StoryFn } from '@storybook/react';
import { BudgetItem } from './BudgetItem';

const Story: Meta<typeof BudgetItem> = {
  component: BudgetItem,
  title: 'BudgetItem',
};
export default Story;

const Template: StoryFn<typeof BudgetItem> = (args) => <BudgetItem {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  budget: {
    category: 'groceries',
    limit: 100,
    id: 1,
  },
  onUpdate: () => {
    return;
  },
};
