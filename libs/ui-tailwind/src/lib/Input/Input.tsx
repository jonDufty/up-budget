import React from 'react';

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  id: string;
  onChange?: () => void;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  prefix?: string;
}

export function Input({ label, id, onChange, placeholder, type, prefix }: InputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      )}
      <div className="relative mt-2 rounded-md shadow-sm">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">{prefix}</span>
          </div>
        )}
        <input
          onChange={onChange}
          type={type}
          name={id}
          id={id}
          className={`block w-full rounded-md border-0 py-1.5 ${prefix ? 'pl-8': 'pl-4'} pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
