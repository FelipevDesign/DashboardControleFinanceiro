import React from 'react';
import { statusColors } from '../../utils/statusHelpers';

interface ProgressBarProps {
  progress: number;
  status?: "completo" | "parcial" | "pendente" | "Em Andamento" | "Completo" | "Pendente";
  showPercentage?: boolean;
  height?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  status = "pendente", 
  showPercentage = true,
  height = "h-2"
}) => {
  const getStatusColor = () => {
    if (progress === 100) return statusColors["completo"];
    if (progress > 0) return statusColors["parcial"];
    return statusColors["pendente"];
  };

  const barColor = status ? statusColors[status] : getStatusColor();

  return (
    <div className="w-full">
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${height}`}>
        <div
          className={`${barColor} transition-all duration-500 ease-in-out rounded-full ${height}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-xs text-gray-500 mt-1 font-medium">
          {progress}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;