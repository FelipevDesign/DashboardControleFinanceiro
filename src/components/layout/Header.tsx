import React from 'react';
import { Code, Save } from 'lucide-react';
import { useData } from '../../context/DataContext';
import EditableText from '../ui/EditableText';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { data, updateUltimaAtualizacao, saveDataToJSON } = useData();
  
  const handleUpdateDate = () => {
    updateUltimaAtualizacao();
  };
  
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Code size={24} className="text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">
            Dashboard SaaS Financeiro
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Última atualização: <span className="font-medium">{data.ultimaAtualizacao}</span>
            <button 
              onClick={handleUpdateDate}
              className="ml-2 text-blue-600 hover:text-blue-800 text-xs underline"
            >
              Atualizar
            </button>
          </div>
          
          <Button 
            variant="primary"
            size="sm"
            icon={<Save size={16} />}
            onClick={saveDataToJSON}
          >
            Salvar JSON
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;