import React from 'react';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'disabled';
  size?: 'small' | 'medium' | 'large';
}

export function Button({ children, ...props }: ButtonProps) {

  const baseStyles = "px-4 py-2 rounded-full h-10 w-48 text-center text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"

  const primaryColors = "bg-blue-700 border-1 border-blue-900 hover:bg-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
  const secondaryColors = "bg-gray-500 border-1 border-gray-900 hover:bg-gray-600 focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
  const tertiaryColors = "bg-green-700 border-1 border-green-900 hover:bg-green-600 focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
  const disabledColors = "bg-gray-300 border-1 border-gray-900 hover:bg-gray-300 focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"

  const colors = {
    "primary": primaryColors,
    "secondary": secondaryColors,
    "tertiary": tertiaryColors,
    "disabled": disabledColors
  }

  const sizes = {
    "small": "h-10 w-48",
    "medium": "h-12 w-64",
    "large": "h-16 w-80"
  }
  return (
    <div>
      <button
        {...props}
        disabled={props.variant === 'disabled'}
        className={`${baseStyles} ${colors[props.variant || 'primary']} ${sizes[props.size || 'medium']}`}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
