import React from 'react';
import { LineChart, Target, Layers, LayoutDashboard, Briefcase as BriefcaseBusiness, ListChecks } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { calculateOverallProgress } from '../../utils/statusHelpers';
import { Section } from '../../types';
import ProgressBar from '../ui/ProgressBar';

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  progress?: number;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ 
  icon, 
  label, 
  isActive, 
  onClick,
  progress
}) => {
  return (
    <div
      className={`flex flex-col mb-1 rounded-md transition-colors cursor-pointer
        ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
      onClick={onClick}
    >
      <div className="flex items-center p-3">
        <span className="mr-3">
          {icon}
        </span>
        <span className={isActive ? 'font-medium' : ''}>
          {label}
        </span>
      </div>
      
      {progress !== undefined && (
        <div className="px-3 pb-3">
          <ProgressBar 
            progress={progress} 
            showPercentage={false} 
            height="h-1"
          />
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const { activeSection, setActiveSection, data } = useData();
  
  const overallProgress = calculateOverallProgress(data.roadmap.fases);
  
  const navegarPara = (secao: Section) => {
    setActiveSection(secao);
  };
  
  return (
    <div className="w-64 h-full bg-white border-r border-gray-200">
      <div className="p-4">
        <div className="mb-6 text-center">
          <div className="font-bold text-gray-800 mb-2">Progresso Geral</div>
          <ProgressBar progress={overallProgress} />
        </div>
        
        <nav>
          <SidebarLink
            icon={<LayoutDashboard size={20} />}
            label="Visão Geral"
            isActive={activeSection === "visaogeral"}
            onClick={() => navegarPara("visaogeral")}
          />
          
          <SidebarLink
            icon={<BriefcaseBusiness size={20} />}
            label="Estratégia de Negócio"
            isActive={activeSection === "estrategia"}
            onClick={() => navegarPara("estrategia")}
          />
          
          <SidebarLink
            icon={<Layers size={20} />}
            label="MVP"
            isActive={activeSection === "mvp"}
            onClick={() => navegarPara("mvp")}
          />
          
          <SidebarLink
            icon={<LineChart size={20} />}
            label="Roadmap"
            isActive={activeSection === "roadmap"}
            onClick={() => navegarPara("roadmap")}
          />
          
          <SidebarLink
            icon={<ListChecks size={20} />}
            label="Ações Imediatas"
            isActive={activeSection === "acoes"}
            onClick={() => navegarPara("acoes")}
          />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;