import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MonthlyGraph } from './MonthlyGraph';

const Story: ComponentMeta<typeof MonthlyGraph> = {
  component: MonthlyGraph,
  title: 'MonthlyGraph',
};
export default Story;

const Template: ComponentStory<typeof MonthlyGraph> = (args) => <MonthlyGraph {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  chartData: [
    {
      category: 'rent',
      amount: 2000,
      limit: 2000,
    },
    {
      category: 'utilities',
      amount: 600,
      limit: 500,
    },
    {
      category: 'groceries',
      amount: 500,
      limit: 700,
    },
    {
      category: 'other',
      amount: 200,
      limit: 1000,
    },
  ],
};
