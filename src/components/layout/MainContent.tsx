import React from 'react';
import { useData } from '../../context/DataContext';

import DashboardOverview from '../sections/DashboardOverview';
import EstrategiaNegocio from '../sections/EstrategiaNegocio';
import MVP from '../sections/MVP';
import Roadmap from '../sections/Roadmap';
import AcoesImediatas from '../sections/AcoesImediatas';

const MainContent: React.FC = () => {
  const { activeSection } = useData();
  
  const renderSection = () => {
    switch (activeSection) {
      case 'visaogeral':
        return <DashboardOverview />;
      case 'estrategia':
        return <EstrategiaNegocio />;
      case 'mvp':
        return <MVP />;
      case 'roadmap':
        return <Roadmap />;
      case 'acoes':
        return <AcoesImediatas />;
      default:
        return <DashboardOverview />;
    }
  };
  
  return (
    <div className="flex-1 overflow-auto p-6">
      {renderSection()}
    </div>
  );
};

export default MainContent;