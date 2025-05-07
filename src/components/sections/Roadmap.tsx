import React from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Card from '../ui/Card';
import EditableText from '../ui/EditableText';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import StatusBadge from '../ui/StatusBadge';
import { StatusType } from '../../types';

const Roadmap: React.FC = () => {
  const { 
    data,
    addFase,
    updateFase,
    updateFaseStatus,
    removeFase,
    addTarefaToFase,
    updateTarefa,
    updateTarefaStatus,
    removeTarefa
  } = useData();
  
  const nextFaseStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case 'Pendente': return 'Em Andamento';
      case 'Em Andamento': return 'Completo';
      case 'Completo': return 'Pendente';
      default: return 'Pendente';
    }
  };
  
  const nextStatus = (currentStatus: StatusType): StatusType => {
    switch (currentStatus) {
      case 'pendente': return 'parcial';
      case 'parcial': return 'completo';
      case 'completo': return 'pendente';
      default: return 'pendente';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Roadmap (Visão Geral)</h2>
        <Button 
          variant="primary" 
          size="sm"
          icon={<PlusCircle size={16} />}
          onClick={addFase}
        >
          Nova Fase
        </Button>
      </div>
      
      <div className="space-y-8">
        {data.roadmap.fases.map(fase => (
          <Card 
            key={fase.id}
            className={`border-l-4 ${
              fase.status === 'Completo' 
                ? 'border-l-green-500' 
                : fase.status === 'Em Andamento' 
                  ? 'border-l-amber-500' 
                  : 'border-l-gray-300'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-3 flex-1">
                <StatusBadge 
                  status={fase.status} 
                  onClick={() => updateFaseStatus(fase.id, nextFaseStatus(fase.status) as any)}
                />
                <EditableText
                  value={fase.titulo}
                  onChange={(value) => updateFase(fase.id, 'titulo', value)}
                  as="h3"
                  className="text-lg font-medium text-gray-800"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={<Trash2 size={16} />}
                onClick={() => removeFase(fase.id)}
                className="text-red-500 hover:text-red-700"
              />
            </div>
            
            <div className="mb-4">
              <ProgressBar progress={fase.progresso} />
            </div>
            
            <div className="space-y-3 mt-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-base font-medium text-gray-700">Tarefas</h4>
                <Button 
                  variant="outline" 
                  size="sm"
                  icon={<PlusCircle size={14} />}
                  onClick={() => addTarefaToFase(fase.id)}
                >
                  Adicionar
                </Button>
              </div>
              
              {fase.tarefas.map(tarefa => (
                <div 
                  key={tarefa.id} 
                  className="flex items-start gap-2 bg-gray-50 p-3 rounded border border-gray-100"
                >
                  <StatusBadge 
                    status={tarefa.status} 
                    onClick={() => updateTarefaStatus(fase.id, tarefa.id, nextStatus(tarefa.status))}
                  />
                  <div className="flex-1">
                    <EditableText
                      value={tarefa.titulo}
                      onChange={(value) => updateTarefa(fase.id, tarefa.id, 'titulo', value)}
                      as="p"
                      className="text-gray-700"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Trash2 size={14} />}
                    onClick={() => removeTarefa(fase.id, tarefa.id)}
                    className="text-red-500 hover:text-red-700"
                  />
                </div>
              ))}
              
              {fase.tarefas.length === 0 && (
                <p className="text-sm text-gray-500 italic">Nenhuma tarefa definida para esta fase.</p>
              )}
            </div>
          </Card>
        ))}
        
        {data.roadmap.fases.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Nenhuma fase definida no roadmap.</p>
            <Button 
              variant="primary" 
              size="md"
              icon={<PlusCircle size={16} />}
              onClick={addFase}
            >
              Adicionar Primeira Fase
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;