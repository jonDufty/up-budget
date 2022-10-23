import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BudgetChartData, MonthlyGraph } from './MonthlyGraph';

const Story: ComponentMeta<typeof MonthlyGraph> = {
  component: MonthlyGraph,
  title: 'MonthlyGraph',
};
export default Story;

const chartData: BudgetChartData[] =  [
  {
    category: 'rent',
    amount: 2000,
    limit: 2000,
  },
  {
    category: 'utilities',
    amount: 600,
    limit: 700,
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
]

const Template: ComponentStory<typeof MonthlyGraph> = (args) => <MonthlyGraph {...args} />;

export const Primary = Template.bind({});
Primary.storyName = 'Standard graph'

Primary.args = {
  chartData: chartData,
  chartProps: {
    width: 500,
    height: 300
  }
};

const WithExceed: ComponentStory<typeof MonthlyGraph> = (args) => <MonthlyGraph {...args} />

export const WithExceedance = WithExceed.bind({})

WithExceedance.storyName = 'With budget exceedance'

WithExceedance.args = {
  chartProps: {
    width: 500,
    height: 300
  },
  chartData: [
    ...chartData,
    {
      category: 'exceeded',
      limit: 1000,
      amount: 1500
    }
  ]


}
