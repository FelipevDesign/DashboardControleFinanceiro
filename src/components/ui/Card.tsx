import React, { ReactNode } from 'react';

interface CardProps {
  title?: string | ReactNode;
  children: ReactNode;
  className?: string;
  headerActions?: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, className = '', headerActions }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {(title || headerActions) && (
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <div className="font-medium text-gray-700">
            {title}
          </div>
          {headerActions && (
            <div className="flex items-center space-x-2">
              {headerActions}
            </div>
          )}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default Card;