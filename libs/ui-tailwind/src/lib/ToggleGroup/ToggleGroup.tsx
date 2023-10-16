import React from 'react';
import * as ToggleGroupRadix from '@radix-ui/react-toggle-group';
import { TextAlignLeftIcon, TextAlignCenterIcon, TextAlignRightIcon } from '@radix-ui/react-icons';

const toggleGroupItemClasses =
  'hover:bg-violet-100 color-mauve11 data-[state=on]:bg-violet-200 data-[state=on]:text-violet12 flex h-[35px] px-4 items-center justify-center bg-white text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none';

interface ToggleGroupProps {
  items: {
    component: React.ReactNode;
    value: string;
    label: string;
  }[];
}

export const ToggleGroup = ({items}: ToggleGroupProps) => (
  <ToggleGroupRadix.Root
    className="inline-flex bg-mauve6 rounded shadow-md shadow-gray-400 space-x-px"
    type="single"
    defaultValue="center"
    aria-label="Text alignment"
  >
    {items.map((item, idx) => (
      <ToggleGroupRadix.Item className={toggleGroupItemClasses} value={item.value} aria-label={item.label} key={idx}>
        {item.component}
      </ToggleGroupRadix.Item>
    ))
    }
    <ToggleGroupRadix.Item className={toggleGroupItemClasses} value="left" aria-label="Left aligned">
      <TextAlignLeftIcon />
    </ToggleGroupRadix.Item>
    <ToggleGroupRadix.Item className={toggleGroupItemClasses} value="center" aria-label="Center aligned">
      <TextAlignCenterIcon />
    </ToggleGroupRadix.Item>
    <ToggleGroupRadix.Item className={toggleGroupItemClasses} value="right" aria-label="Right aligned">
      <TextAlignRightIcon />
    </ToggleGroupRadix.Item>
  </ToggleGroupRadix.Root>
);

export default ToggleGroup;
