import React from 'react';
import { Check, Clock, PlusCircle, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Card from '../ui/Card';
import EditableText from '../ui/EditableText';
import Button from '../ui/Button';

const AcoesImediatas: React.FC = () => {
  const { 
    data,
    addAcaoImediata,
    updateAcaoImediata,
    updateAcaoImediataStatus,
    removeAcaoImediata
  } = useData();
  
  const tiposAcao = ["Definir", "Desenvolver", "Refinar", "Pesquisar/Escolher", "Criar", "Escrever", "Testar", "Outro"];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Checklist de Ações Imediatas</h2>
        <Button 
          variant="primary" 
          size="sm"
          icon={<PlusCircle size={16} />}
          onClick={addAcaoImediata}
        >
          Nova Ação
        </Button>
      </div>
      
      <Card>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Pendentes</h3>
            <div className="space-y-2">
              {data.acoesImediatas
                .filter(acao => acao.status === "pendente")
                .map(acao => (
                  <div key={acao.id} className="flex items-start p-3 bg-gray-50 border border-gray-200 rounded-md">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Check size={14} />}
                      className="mr-2 text-green-600 hover:bg-green-50 hover:border-green-200"
                      onClick={() => updateAcaoImediataStatus(acao.id, "completo")}
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <select
                          className="text-xs font-medium bg-gray-100 text-gray-800 rounded px-2 py-1 border border-gray-200 mr-2"
                          value={acao.tipo}
                          onChange={(e) => updateAcaoImediata(acao.id, 'tipo', e.target.value)}
                        >
                          {tiposAcao.map(tipo => (
                            <option key={tipo} value={tipo}>{tipo}</option>
                          ))}
                        </select>
                      </div>
                      
                      <EditableText
                        value={acao.descricao}
                        onChange={(value) => updateAcaoImediata(acao.id, 'descricao', value)}
                        as="p"
                        className="text-gray-700"
                      />
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Trash2 size={14} />}
                      onClick={() => removeAcaoImediata(acao.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    />
                  </div>
                ))}
              
              {data.acoesImediatas.filter(acao => acao.status === "pendente").length === 0 && (
                <p className="text-sm text-gray-500 italic p-3">Não há ações pendentes.</p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Concluídas</h3>
            <div className="space-y-2">
              {data.acoesImediatas
                .filter(acao => acao.status === "completo")
                .map(acao => (
                  <div key={acao.id} className="flex items-start p-3 bg-green-50 border border-green-200 rounded-md">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Clock size={14} />}
                      className="mr-2 text-amber-600 hover:bg-amber-50 hover:border-amber-200"
                      onClick={() => updateAcaoImediataStatus(acao.id, "pendente")}
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <select
                          className="text-xs font-medium bg-green-100 text-gray-800 rounded px-2 py-1 border border-green-200 mr-2"
                          value={acao.tipo}
                          onChange={(e) => updateAcaoImediata(acao.id, 'tipo', e.target.value)}
                        >
                          {tiposAcao.map(tipo => (
                            <option key={tipo} value={tipo}>{tipo}</option>
                          ))}
                        </select>
                      </div>
                      
                      <EditableText
                        value={acao.descricao}
                        onChange={(value) => updateAcaoImediata(acao.id, 'descricao', value)}
                        as="p"
                        className="text-gray-700"
                      />
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Trash2 size={14} />}
                      onClick={() => removeAcaoImediata(acao.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    />
                  </div>
                ))}
              
              {data.acoesImediatas.filter(acao => acao.status === "completo").length === 0 && (
                <p className="text-sm text-gray-500 italic p-3">Não há ações concluídas.</p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AcoesImediatas;