import React from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Card from '../ui/Card';
import EditableText from '../ui/EditableText';
import Button from '../ui/Button';

const EstrategiaNegocio: React.FC = () => {
  const { 
    data, 
    addPublicoAlvo, 
    updatePublicoAlvo, 
    removePublicoAlvo,
    updatePropostaValorDeclaracao,
    addDiferencial,
    updateDiferencial,
    removeDiferencial,
    addModeloMonetizacao,
    updateModeloMonetizacao,
    removeModeloMonetizacao
  } = useData();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Estratégia de Negócio</h2>
      
      <Card 
        title="Público-Alvo Inicial (Nicho MVP)"
        headerActions={
          <Button 
            variant="outline" 
            size="sm"
            icon={<PlusCircle size={14} />}
            onClick={addPublicoAlvo}
          >
            Adicionar
          </Button>
        }
      >
        <div className="space-y-4">
          {data.estrategiaNegocio.publicoAlvo.map(item => (
            <div key={item.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <EditableText
                  value={item.titulo}
                  onChange={(value) => updatePublicoAlvo(item.id, 'titulo', value)}
                  as="h3"
                  className="text-gray-700 font-medium"
                />
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Trash2 size={14} />}
                  onClick={() => removePublicoAlvo(item.id)}
                  className="text-red-500 hover:text-red-700"
                />
              </div>
              <EditableText
                value={item.descricao}
                onChange={(value) => updatePublicoAlvo(item.id, 'descricao', value)}
                as="p"
                multiline
                className="text-gray-600"
              />
            </div>
          ))}
          
          {data.estrategiaNegocio.publicoAlvo.length === 0 && (
            <p className="text-gray-500 italic">Nenhum público-alvo definido. Clique em "Adicionar" para criar um.</p>
          )}
        </div>
      </Card>
      
      <Card 
        title="Proposta de Valor Única (PVU) para o Nicho"
      >
        <div className="mb-4">
          <h3 className="text-base font-medium text-gray-700 mb-2">Declaração:</h3>
          <EditableText
            value={data.estrategiaNegocio.propostaValor.declaracao}
            onChange={updatePropostaValorDeclaracao}
            as="p"
            multiline
            className="text-gray-600"
          />
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-base font-medium text-gray-700">Diferenciais Chave:</h3>
            <Button 
              variant="outline" 
              size="sm"
              icon={<PlusCircle size={14} />}
              onClick={addDiferencial}
            >
              Adicionar
            </Button>
          </div>
          
          <div className="space-y-3">
            {data.estrategiaNegocio.propostaValor.diferenciais.map(item => (
              <div key={item.id} className="flex justify-between items-start border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <div className="flex-1">
                  <EditableText
                    value={item.titulo}
                    onChange={(value) => updateDiferencial(item.id, 'titulo', value)}
                    as="h4"
                    className="text-gray-700 font-medium"
                  />
                  <EditableText
                    value={item.descricao}
                    onChange={(value) => updateDiferencial(item.id, 'descricao', value)}
                    as="p"
                    multiline
                    className="text-gray-600 text-sm"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Trash2 size={14} />}
                  onClick={() => removeDiferencial(item.id)}
                  className="text-red-500 hover:text-red-700 ml-2"
                />
              </div>
            ))}
            
            {data.estrategiaNegocio.propostaValor.diferenciais.length === 0 && (
              <p className="text-gray-500 italic">Nenhum diferencial definido.</p>
            )}
          </div>
        </div>
      </Card>
      
      <Card 
        title="Modelo de Monetização Inicial"
        headerActions={
          <Button 
            variant="outline" 
            size="sm"
            icon={<PlusCircle size={14} />}
            onClick={addModeloMonetizacao}
          >
            Adicionar
          </Button>
        }
      >
        <div className="space-y-4">
          {data.estrategiaNegocio.modeloMonetizacao.map(item => (
            <div key={item.id} className="flex justify-between items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <div className="flex-1">
                <EditableText
                  value={item.titulo}
                  onChange={(value) => updateModeloMonetizacao(item.id, 'titulo', value)}
                  as="h3"
                  className="text-gray-700 font-medium mb-1"
                />
                <EditableText
                  value={item.descricao}
                  onChange={(value) => updateModeloMonetizacao(item.id, 'descricao', value)}
                  as="p"
                  multiline
                  className="text-gray-600"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={<Trash2 size={14} />}
                onClick={() => removeModeloMonetizacao(item.id)}
                className="text-red-500 hover:text-red-700 ml-2"
              />
            </div>
          ))}
          
          {data.estrategiaNegocio.modeloMonetizacao.length === 0 && (
            <p className="text-gray-500 italic">Nenhum modelo de monetização definido.</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default EstrategiaNegocio;