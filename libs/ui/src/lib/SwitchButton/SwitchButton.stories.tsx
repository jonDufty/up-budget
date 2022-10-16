import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SwitchButton } from './SwitchButton';

const Story: ComponentMeta<typeof SwitchButton> = {
  component: SwitchButton,
  title: 'SwitchButton',
};
export default Story;

const Template: ComponentStory<typeof SwitchButton> = (args) => <SwitchButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  inactive: 'All Merchants',
  active: 'Uncategorised',
  onClick: () => {return}
};
