import { Meta } from '@storybook/react';
import { Button, Theme } from '@radix-ui/themes';

export default {
  title: 'Radix/Button',
  component: Button,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
} as Meta;

export const Primary = () => <Button>Primary Button</Button>;
// export const Secondary = () => <Button variant="secondary">Secondary Button</Button>;
// export const Tertiary = () => <Button variant="tertiary">Tertiary Button</Button>;
