import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Card({ children, onClick, className = '' }: CardProps) {
  const baseClasses =
    "bg-white rounded-2xl shadow-sm border border-gray-100 p-5 transition-all duration-300";
  const interactiveClasses = onClick
    ? "cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:border-[#2E7D32]/20 active:scale-[0.98]"
    : "";
  return (
    <div
      className={`${baseClasses} ${interactiveClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
