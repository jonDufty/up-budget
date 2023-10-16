import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="transition ease-in-out delay-50 items-center text-center justify-around hover:-translate-y-0.5 shadow-md hover:shadow-xl  border-1 border-gray-700 p-4 rounded-md h-48">
      {children}
    </div>
  );
}

export default Card;
