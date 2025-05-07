import React from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Card from '../ui/Card';
import EditableText from '../ui/EditableText';
import Button from '../ui/Button';
import StatusBadge from '../ui/StatusBadge';
import { StatusType } from '../../types';

const MVP: React.FC = () => {
  const { 
    data,
    addFuncionalidadeEssencial,
    updateFuncionalidadeEssencial,
    updateFuncionalidadeEssencialStatus,
    removeFuncionalidadeEssencial,
    addSubItemToFuncionalidade,
    updateSubItemStatus,
    updateSubItemText,
    removeSubItem,
    addFuncionalidadeForaMVP,
    updateFuncionalidadeForaMVP,
    updateFuncionalidadeForaMVPStatus,
    removeFuncionalidadeForaMVP,
    addRequisitoNaoFuncional,
    updateRequisitoNaoFuncional,
    updateRequisitoNaoFuncionalStatus,
    removeRequisitoNaoFuncional
  } = useData();
  
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
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Produto Mínimo Viável (MVP) - Foco Casais</h2>
      
      <Card 
        title="Funcionalidades Essenciais"
        headerActions={
          <Button 
            variant="outline" 
            size="sm"
            icon={<PlusCircle size={14} />}
            onClick={addFuncionalidadeEssencial}
          >
            Adicionar
          </Button>
        }
      >
        <div className="space-y-6">
          {data.mvp.funcionalidadesEssenciais.map(item => (
            <div key={item.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-start gap-2 flex-1">
                  <StatusBadge 
                    status={item.status} 
                    onClick={() => updateFuncionalidadeEssencialStatus(item.id, nextStatus(item.status))}
                  />
                  <EditableText
                    value={item.titulo}
                    onChange={(value) => updateFuncionalidadeEssencial(item.id, 'titulo', value)}
                    as="h3"
                    className="text-gray-700 font-medium"
                  />
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Trash2 size={14} />}
                  onClick={() => removeFuncionalidadeEssencial(item.id)}
                  className="text-red-500 hover:text-red-700"
                />
              </div>
              
              {item.descricao && (
                <div className="ml-14 mb-3">
                  <EditableText
                    value={item.descricao}
                    onChange={(value) => updateFuncionalidadeEssencial(item.id, 'descricao', value)}
                    as="p"
                    className="text-sm text-gray-600"
                  />
                </div>
              )}
              
              {item.subItens && item.subItens.length > 0 && (
                <div className="ml-8 mt-3 space-y-2">
                  {item.subItens.map(subItem => (
                    <div key={subItem.id} className="flex items-start gap-2 bg-gray-50 p-2 rounded">
                      <StatusBadge 
                        status={subItem.status} 
                        onClick={() => updateSubItemStatus(item.id, subItem.id, nextStatus(subItem.status))}
                      />
                      <div className="flex-1">
                        <EditableText
                          value={subItem.titulo}
                          onChange={(value) => updateSubItemText(item.id, subItem.id, value)}
                          as="p"
                          className="text-sm text-gray-700"
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Trash2 size={14} />}
                        onClick={() => removeSubItem(item.id, subItem.id)}
                        className="text-red-500 hover:text-red-700"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-2 ml-8">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<PlusCircle size={14} />}
                  onClick={() => addSubItemToFuncionalidade(item.id)}
                >
                  Adicionar Sub-item
                </Button>
              </div>
            </div>
          ))}
          
          {data.mvp.funcionalidadesEssenciais.length === 0 && (
            <p className="text-gray-500 italic">Nenhuma funcionalidade essencial definida.</p>
          )}
        </div>
      </Card>
      
      <Card 
        title="Funcionalidades Fora do MVP Inicial"
        headerActions={
          <Button 
            variant="outline" 
            size="sm"
            icon={<PlusCircle size={14} />}
            onClick={addFuncionalidadeForaMVP}
          >
            Adicionar
          </Button>
        }
      >
        <div className="space-y-4">
          {data.mvp.funcionalidadesForaMVP.map(item => (
            <div key={item.id} className="flex items-start gap-2 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <StatusBadge 
                status={item.status} 
                onClick={() => updateFuncionalidadeForaMVPStatus(item.id, nextStatus(item.status))}
              />
              <div className="flex-1">
                <EditableText
                  value={item.titulo}
                  onChange={(value) => updateFuncionalidadeForaMVP(item.id, 'titulo', value)}
                  as="h3"
                  className="text-gray-700 font-medium"
                />
                {item.descricao && (
                  <EditableText
                    value={item.descricao}
                    onChange={(value) => updateFuncionalidadeForaMVP(item.id, 'descricao', value)}
                    as="p"
                    className="text-sm text-gray-600"
                  />
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={<Trash2 size={14} />}
                onClick={() => removeFuncionalidadeForaMVP(item.id)}
                className="text-red-500 hover:text-red-700"
              />
            </div>
          ))}
          
          {data.mvp.funcionalidadesForaMVP.length === 0 && (
            <p className="text-gray-500 italic">Nenhuma funcionalidade fora do MVP definida.</p>
          )}
        </div>
      </Card>
      
      <Card 
        title="Requisitos Não-Funcionais MVP"
        headerActions={
          <Button 
            variant="outline" 
            size="sm"
            icon={<PlusCircle size={14} />}
            onClick={addRequisitoNaoFuncional}
          >
            Adicionar
          </Button>
        }
      >
        <div className="space-y-3">
          {data.mvp.requisitosNaoFuncionais.map(item => (
            <div key={item.id} className="flex items-start gap-2 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <StatusBadge 
                status={item.status} 
                onClick={() => updateRequisitoNaoFuncionalStatus(item.id, nextStatus(item.status))}
              />
              <div className="flex-1">
                <EditableText
                  value={item.titulo}
                  onChange={(value) => updateRequisitoNaoFuncional(item.id, 'titulo', value)}
                  as="h3"
                  className="text-gray-700"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={<Trash2 size={14} />}
                onClick={() => removeRequisitoNaoFuncional(item.id)}
                className="text-red-500 hover:text-red-700"
              />
            </div>
          ))}
          
          {data.mvp.requisitosNaoFuncionais.length === 0 && (
            <p className="text-gray-500 italic">Nenhum requisito não-funcional definido.</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default MVP;