import React from 'react';
import { statusColors, statusText } from '../../utils/statusHelpers';

type Status = "completo" | "parcial" | "pendente" | "Em Andamento" | "Completo" | "Pendente";

interface StatusBadgeProps {
  status: Status;
  onClick?: () => void;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, onClick }) => {
  const color = statusColors[status];
  const text = statusText[status];
  
  const className = onClick
    ? `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color} text-white cursor-pointer hover:opacity-90 transition-opacity`
    : `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color} text-white`;
  
  return (
    <span 
      className={className}
      onClick={onClick}
    >
      {text}
    </span>
  );
};

export default StatusBadge;