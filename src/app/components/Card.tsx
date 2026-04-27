import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Card({ children, onClick, className = '' }: CardProps) {
  const baseClasses = "bg-white rounded-xl shadow-sm border border-gray-200 p-4 transition-all";
  const interactiveClasses = onClick ? "cursor-pointer hover:shadow-md hover:border-[#2E7D32]/30 active:scale-[0.98]" : "";

  return (
    <div
      className={`${baseClasses} ${interactiveClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
