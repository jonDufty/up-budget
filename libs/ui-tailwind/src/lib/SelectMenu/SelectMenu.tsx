import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import React from 'react';

export interface SelectMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  width?: number
  fullWidth?: boolean
  items: string[];
}

export function SelectMenu({ items, fullWidth, width }: SelectMenuProps) {
const widthStyle = fullWidth ? "w-full" : (width ? `w-${width}` : "")
  return (
          <Select.Root>
            <Select.Trigger
              className={`relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6`}
              aria-label="Food"
            >
              <Select.Value placeholder="Select something" />
              <Select.Icon className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content position="item-aligned" className={`absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}>
                <Select.Viewport>
                  {items.map((item, idx) => {
                    return (
                      <SelectItem value={item} key={item}>
                        {item}
                      </SelectItem>
                    );
                  })}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>

  );
}

const SelectItem = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => {
    return (
      <Select.Item
        className={className +
          'relative cursor-default flex items-center select-none py-2 pl-3 pr-9 data-[disabled]:text-blue-400 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-blue-900 data-[highlighted]:text-white'
        }
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute right-3 inline-flex items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);
