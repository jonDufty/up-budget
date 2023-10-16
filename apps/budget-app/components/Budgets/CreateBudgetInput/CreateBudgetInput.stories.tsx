import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CreateBudgetInput } from './CreateBudgetInput';

const Story: ComponentMeta<typeof CreateBudgetInput> = {
  component: CreateBudgetInput,
  title: 'CreateBudgetInput',
};
export default Story;

const Template: ComponentStory<typeof CreateBudgetInput> = (args) => <CreateBudgetInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  submitHandler: (data: any) => console.log(data),
};
