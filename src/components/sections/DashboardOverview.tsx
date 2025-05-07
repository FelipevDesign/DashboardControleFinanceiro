import React from 'react';
import { useData } from '../../context/DataContext';
import Card from '../ui/Card';
import EditableText from '../ui/EditableText';
import ProgressBar from '../ui/ProgressBar';
import { calculateOverallProgress, calculateProgress } from '../../utils/statusHelpers';
import StatusBadge from '../ui/StatusBadge';

const DashboardOverview: React.FC = () => {
  const { data, updateVisao } = useData();
  
  const mvpProgress = calculateProgress([
    ...data.mvp.funcionalidadesEssenciais,
    ...data.mvp.requisitosNaoFuncionais
  ]);
  
  const roadmapProgress = calculateOverallProgress(data.roadmap.fases);
  
  const acoesImediatasProgress = calculateProgress(
    data.acoesImediatas.map(acao => ({ 
      ...acao, 
      status: acao.status as any 
    }))
  );
  
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Visão Geral</h2>
        
        <Card className="mb-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Visão</h3>
            <EditableText
              value={data.visao}
              onChange={updateVisao}
              as="p"
              multiline
              className="text-gray-600"
            />
          </div>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Progresso MVP</h3>
              <div className="flex justify-center mb-2">
                <div className="w-24 h-24 relative">
                  <div className="w-full h-full rounded-full bg-gray-200">
                    <div 
                      className="absolute top-0 left-0 w-full h-full rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold"
                      style={{ 
                        clipPath: `circle(${mvpProgress}% at center)` 
                      }}
                    >
                      {mvpProgress}%
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {data.mvp.funcionalidadesEssenciais.filter(f => f.status === "completo").length} de {data.mvp.funcionalidadesEssenciais.length} funcionalidades concluídas
              </p>
            </div>
          </Card>
          
          <Card>
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Progresso Roadmap</h3>
              <div className="flex justify-center mb-2">
                <div className="w-24 h-24 relative">
                  <div className="w-full h-full rounded-full bg-gray-200">
                    <div 
                      className="absolute top-0 left-0 w-full h-full rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold"
                      style={{ 
                        clipPath: `circle(${roadmapProgress}% at center)` 
                      }}
                    >
                      {roadmapProgress}%
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {data.roadmap.fases.filter(f => f.status === "Completo").length} de {data.roadmap.fases.length} fases concluídas
              </p>
            </div>
          </Card>
          
          <Card>
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Ações Imediatas</h3>
              <div className="flex justify-center mb-2">
                <div className="w-24 h-24 relative">
                  <div className="w-full h-full rounded-full bg-gray-200">
                    <div 
                      className="absolute top-0 left-0 w-full h-full rounded-full bg-amber-500 flex items-center justify-center text-white text-xl font-bold"
                      style={{ 
                        clipPath: `circle(${acoesImediatasProgress}% at center)` 
                      }}
                    >
                      {acoesImediatasProgress}%
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {data.acoesImediatas.filter(a => a.status === "completo").length} de {data.acoesImediatas.length} ações concluídas
              </p>
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Status das Fases">
            <div className="space-y-4">
              {data.roadmap.fases.map(fase => (
                <div key={fase.id} className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {fase.titulo}
                    </span>
                    <StatusBadge status={fase.status} />
                  </div>
                  <ProgressBar progress={fase.progresso} />
                </div>
              ))}
            </div>
          </Card>
          
          <Card title="Ações Imediatas Pendentes">
            <div className="space-y-2">
              {data.acoesImediatas
                .filter(acao => acao.status === "pendente")
                .map(acao => (
                  <div key={acao.id} className="flex items-start p-2 border-b border-gray-100">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded mr-2">
                      {acao.tipo}
                    </span>
                    <span className="text-sm text-gray-700">{acao.descricao}</span>
                  </div>
                ))}
                
              {data.acoesImediatas.filter(acao => acao.status === "pendente").length === 0 && (
                <p className="text-sm text-gray-500 italic">Nenhuma ação imediata pendente.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;