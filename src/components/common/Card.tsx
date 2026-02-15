import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export default function Card({ children, className = '', hover = false, glass = false }: CardProps) {
  const baseStyles = 'rounded-3xl overflow-hidden';
  const hoverClass = hover ? 'card-hover' : '';
  const glassClass = glass ? 'glass' : 'bg-white shadow-soft';

  return (
    <div className={`${baseStyles} ${glassClass} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}
