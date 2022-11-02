import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BudgetGraph } from './BudgetGraph';

const Story: ComponentMeta<typeof BudgetGraph> = {
  component: BudgetGraph,
  title: 'BudgetGraph',
};
export default Story;

const Template: ComponentStory<typeof BudgetGraph> = (args) => <BudgetGraph {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  chartData: [
    {
      month: '2022-02',
      amount: 550,
      limit: 600,
    },
    {
      month: '2022-03',
      amount: 800,
      limit: 600,
    },
    {
      month: '2022-04',
      amount: 500,
      limit: 600,
    },
    {
      month: '2022-05',
      amount: 450,
      limit: 600,
    },
  ],
  limit: 600,
  category: 'rent',
  chartProps: {
    width: 500,
    height: 300
  }
};
