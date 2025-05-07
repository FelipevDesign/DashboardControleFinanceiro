import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { initialData } from '../data/initialData';
import {
  AcaoImediata,
  BusinessPlanData,
  Diferencial,
  Fase,
  Funcionalidade,
  ModeloMonetizacao,
  PublicoAlvo,
  RequisitoNaoFuncional,
  Section,
  StatusType,
  Tarefa
} from '../types';
import {
  addNewItem,
  addSubItem,
  addTarefaToFase,
  createNewDiferencial,
  createNewFase,
  createNewFuncionalidade,
  createNewPublicoAlvo,
  createNewRequisitoNaoFuncional,
  createNewTarefa,
  removeItem,
  removeSubItem,
  updateItemStatus,
  updateItemText,
  updateSubItemStatus,
  updateSubItemText
} from '../utils/dataHelpers';
import { calculateFaseProgress } from '../utils/statusHelpers';

interface DataContextType {
  data: BusinessPlanData;
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  updateVisao: (newVisao: string) => void;
  updateUltimaAtualizacao: () => void;
  
  // Estrategia de Negocio
  addPublicoAlvo: () => void;
  updatePublicoAlvo: (id: string, field: string, value: string) => void;
  removePublicoAlvo: (id: string) => void;
  
  addDiferencial: () => void;
  updateDiferencial: (id: string, field: string, value: string) => void;
  removeDiferencial: (id: string) => void;
  
  updatePropostaValorDeclaracao: (value: string) => void;
  
  addModeloMonetizacao: () => void;
  updateModeloMonetizacao: (id: string, field: string, value: string) => void;
  removeModeloMonetizacao: (id: string) => void;
  
  // MVP
  addFuncionalidadeEssencial: () => void;
  updateFuncionalidadeEssencial: (id: string, field: string, value: string) => void;
  updateFuncionalidadeEssencialStatus: (id: string, status: StatusType) => void;
  removeFuncionalidadeEssencial: (id: string) => void;
  
  addSubItemToFuncionalidade: (funcionalidadeId: string) => void;
  updateSubItemStatus: (funcionalidadeId: string, subItemId: string, status: StatusType) => void;
  updateSubItemText: (funcionalidadeId: string, subItemId: string, text: string) => void;
  removeSubItem: (funcionalidadeId: string, subItemId: string) => void;
  
  addFuncionalidadeForaMVP: () => void;
  updateFuncionalidadeForaMVP: (id: string, field: string, value: string) => void;
  updateFuncionalidadeForaMVPStatus: (id: string, status: StatusType) => void;
  removeFuncionalidadeForaMVP: (id: string) => void;
  
  addRequisitoNaoFuncional: () => void;
  updateRequisitoNaoFuncional: (id: string, field: string, value: string) => void;
  updateRequisitoNaoFuncionalStatus: (id: string, status: StatusType) => void;
  removeRequisitoNaoFuncional: (id: string) => void;
  
  // Roadmap
  addFase: () => void;
  updateFase: (id: string, field: string, value: string) => void;
  updateFaseStatus: (id: string, status: "Completo" | "Em Andamento" | "Pendente") => void;
  removeFase: (id: string) => void;
  
  addTarefaToFase: (faseId: string) => void;
  updateTarefa: (faseId: string, tarefaId: string, field: string, value: string) => void;
  updateTarefaStatus: (faseId: string, tarefaId: string, status: StatusType) => void;
  removeTarefa: (faseId: string, tarefaId: string) => void;
  
  // Acoes Imediatas
  addAcaoImediata: () => void;
  updateAcaoImediata: (id: string, field: string, value: string) => void;
  updateAcaoImediataStatus: (id: string, status: "completo" | "pendente") => void;
  removeAcaoImediata: (id: string) => void;
  
  // Persistência
  saveDataToJSON: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<BusinessPlanData>(initialData);
  const [activeSection, setActiveSection] = useState<Section>("visaogeral");

  // Carregar dados do localStorage se existirem
  useEffect(() => {
    const savedData = localStorage.getItem('businessPlanData');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    }
  }, []);

  // Salvar dados no localStorage quando houver mudanças
  useEffect(() => {
    localStorage.setItem('businessPlanData', JSON.stringify(data));
  }, [data]);

  // Funções de atualização geral
  const updateVisao = (newVisao: string) => {
    setData(prev => ({
      ...prev,
      visao: newVisao
    }));
  };

  const updateUltimaAtualizacao = () => {
    const today = new Date().toLocaleDateString('pt-BR');
    setData(prev => ({
      ...prev,
      ultimaAtualizacao: today
    }));
  };

  // Funções para Estratégia de Negócio
  const addPublicoAlvo = () => {
    setData(prev => ({
      ...prev,
      estrategiaNegocio: {
        ...prev.estrategiaNegocio,
        publicoAlvo: addNewItem(prev.estrategiaNegocio.publicoAlvo, createNewPublicoAlvo())
      }
    }));
    updateUltimaAtualizacao();
  };

  const updatePublicoAlvo = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      estrategiaNegocio: {
        ...prev.estrategiaNegocio,
        publicoAlvo: updateItemText(prev.estrategiaNegocio.publicoAlvo, id, field, value)
      }
    }));
    updateUltimaAtualizacao();
  };

  const removePublicoAlvo = (id: string) => {
    setData(prev => ({
      ...prev,
      estrategiaNegocio: {
        ...prev.estrategiaNegocio,
        publicoAlvo: removeItem(prev.estrategiaNegocio.publicoAlvo, id)
      }
    }));
    updateUltimaAtualizacao();
  };

  const addDiferencial = () => {
    setData(prev => ({
      ...prev,
      estrategiaNegocio: {
        ...prev.estrategiaNegocio,
        propostaValor: {
          ...prev.estrategiaNegocio.propostaValor,
          diferenciais: addNewItem(
            prev.estrategiaNegocio.propostaValor.diferenciais,
            createNewDiferencial()
          )
        }
      }
    }));
    updateUltimaAtualizacao();
  };

  const updateDiferencial = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      estrategiaNegocio: {
        ...prev.estrategiaNegocio,
        propostaValor: {
          ...prev.estrategiaNegocio.propostaValor,
          diferenciais: updateItemText(
            prev.estrategiaNegocio.propostaValor.diferenciais,
            id,
            field,
            value
          )
        }
      }
    }));
    updateUltimaAtualizacao();
  };

  const removeDiferencial = (id: string) => {
    setData(prev => ({
      ...prev,
      estrategiaNegocio: {
        ...prev.estrategiaNegocio,
        propostaValor: {
          ...prev.estrategiaNegocio.propostaValor,
          diferenciais: removeItem(
            prev.estrategiaNegocio.propostaValor.diferenciais,
            id
          )
        }
      }
    }));
    updateUltimaAtualizacao();
  };

  const updatePropostaValorDeclaracao = (value: string) => {
    setData(prev => ({
      ...prev,
      estrategiaNegocio: {
        ...prev.estrategiaNegocio,
        propostaValor: {
          ...prev.estrategiaNegocio.propostaValor,
          declaracao: value
        }
      }
    }));
    updateUltimaAtualizacao();
  };

  const addModeloMonetizacao = () => {
    const newItem: ModeloMonetizacao = {
      id: uuidv4(),
      titulo: "Novo Item",
      descricao: "Descrição do novo item"
    };

    setData(prev => ({
      ...prev,
      estrategiaNegocio: {
        ...prev.estrategiaNegocio,
        modeloMonetizacao: [...prev.estrategiaNegocio.modeloMonetizacao, newItem]
      }
    }));
    updateUltimaAtualizacao();
  };

  const updateModeloMonetizacao = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      estrategiaNegocio: {
        ...prev.estrategiaNegocio,
        modeloMonetizacao: updateItemText(
          prev.estrategiaNegocio.modeloMonetizacao,
          id,
          field,
          value
        )
      }
    }));
    updateUltimaAtualizacao();
  };

  const removeModeloMonetizacao = (id: string) => {
    setData(prev => ({
      ...prev,
      estrategiaNegocio: {
        ...prev.estrategiaNegocio,
        modeloMonetizacao: removeItem(prev.estrategiaNegocio.modeloMonetizacao, id)
      }
    }));
    updateUltimaAtualizacao();
  };

  // Funções para MVP
  const addFuncionalidadeEssencial = () => {
    setData(prev => ({
      ...prev,
      mvp: {
        ...prev.mvp,
        funcionalidadesEssenciais: addNewItem(
          prev.mvp.funcionalidadesEssenciais,
          createNewFuncionalidade()
        )
      }
    }));
    updateUltimaAtualizacao();
  };

  const updateFuncionalidadeEssencial = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      mvp: {
        ...prev.mvp,
        funcionalidadesEssenciais: updateItemText(
          prev.mvp.funcionalidadesEssenciais,
          id,
          field,
          value
        )
      }
    }));
    updateUltimaAtualizacao();
  };

  const updateFuncionalidadeEssencialStatus = (id: string, status: StatusType) => {
    setData(prev => ({
      ...prev,
      mvp: {
        ...prev.mvp,
        funcionalidadesEssenciais: updateItemStatus(
          prev.mvp.funcionalidadesEssenciais,
          id,
          status
        )
      }
    }));
    updateUltimaAtualizacao();
  };

  const removeFuncionalidadeEssencial = (id: string) => {
    setData(prev => ({
      ...prev,
      mvp: {
        ...prev.mvp,
        funcionalidadesEssenciais: removeItem(prev.mvp.funcionalidadesEssenciais, id)
      }
    }));
    updateUltimaAtualizacao();
  };

  const addSubItemToFuncionalidade = (funcionalidadeId: string) => {
    setData(prev => ({
      ...prev,
      mvp: {
        ...prev.mvp,
        funcionalidadesEssenciais: addSubItem(
          prev.mvp.funcionalidadesEssenciais, 
          funcionalidadeId
        )
      }
    }));
    updateUltimaAtualizacao();
  };

  const updateSubItemStatusImpl = (funcionalidadeId: string, subItemId: string, status: StatusType) => {
    setData(prev => ({
      ...prev,
      mvp: {
        ...prev.mvp,
        funcionalidadesEssenciais: updateSubItemStatus(
          prev.mvp.funcionalidadesEssenciais,
          funcionalidadeId,
          subItemId,
          status
        )
      }
    }));
    updateUltimaAtualizacao();
  };

  const updateSubItemTextImpl = (funcionalidadeId: string, subItemId: string, text: string) => {
    setData(prev => ({
      ...prev,
      mvp: {
        ...prev.mvp,
        funcionalidadesEssenciais: updateSubItemText(
          prev.mvp.funcionalidadesEssenciais,
          funcionalidadeId,
          subItemId,
          text
        )
      }
    }));
    updateUltimaAtualizacao();
  };

  const removeSubItemImpl = (funcionalidadeId: string, subItemId: string) => {
    setData(prev => ({
      ...prev,
      mvp: {
        ...prev.mvp,
        funcionalidadesEssenciais: removeSubItem(
          prev.mvp.funcionalidadesEssenciais,
          funcionalidadeId,
          subItemId
        )
      }
    }));
    updateUltimaAtualizacao();
  };

  const addFuncionalidadeForaMVP = () => {
    setData(prev => ({
      ...prev,
      mvp: {
        ...prev.mvp,
        funcionalidadesForaMVP: addNewItem(
          prev.mvp.funcionalidadesForaMVP,
          createNewFuncionalidade()
        )
      }
    }));
    updateUltimaAtualizacao();
  };

  const updateFuncionalidadeForaMVP = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      mvp: {
        ...prev.mvp,
        funcionalidadesForaMVP: updateItemText(
          prev.mvp.funcionalidadesForaMVP,
          id,
          field,
          value
        )
      }
    }));
    updateUltimaAtualizacao();
  };

  const updateFuncionalidadeForaMVPStatus = (id: string, status: StatusType) => {
    setData(prev => ({
      ...prev,
      mvp: {
        ...prev.mvp,
        funcionalidadesForaMVP: updateItemStatus(
          prev.mvp.funcionalidadesForaMVP,
          id,
          status
        )
      }
    }));
    updateUltimaAtualizacao();
  };

  const removeFuncionalidadeForaMVP = (id: string) => {
    setData(prev => ({
      ...prev,
      mvp: {
        ...prev.mvp,
        funcionalidadesForaMVP: removeItem(prev.mvp.funcionalidadesForaMVP, id)
      }
    }));
    updateUltimaAtualizacao();
  };

  const addRequisitoNaoFuncional = () => {
    setData(prev => ({
      ...prev,
      mvp: {
        ...prev.mvp,
        requisitosNaoFuncionais: addNewItem(
          prev.mvp.requisitosNaoFuncionais,
          createNewRequisitoNaoFuncional()
        )
      }
    }));
    updateUltimaAtualizacao();
  };

  const updateRequisitoNaoFuncional = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      mvp: {
        ...prev.mvp,
        requisitosNaoFuncionais: updateItemText(
          prev.mvp.requisitosNaoFuncionais,
          id,
          field,
          value
        )
      }
    }));
    updateUltimaAtualizacao();
  };

  const updateRequisitoNaoFuncionalStatus = (id: string, status: StatusType) => {
    setData(prev => ({
      ...prev,
      mvp: {
        ...prev.mvp,
        requisitosNaoFuncionais: updateItemStatus(
          prev.mvp.requisitosNaoFuncionais,
          id,
          status
        )
      }
    }));
    updateUltimaAtualizacao();
  };

  const removeRequisitoNaoFuncional = (id: string) => {
    setData(prev => ({
      ...prev,
      mvp: {
        ...prev.mvp,
        requisitosNaoFuncionais: removeItem(prev.mvp.requisitosNaoFuncionais, id)
      }
    }));
    updateUltimaAtualizacao();
  };

  // Funções para Roadmap
  const addFase = () => {
    setData(prev => ({
      ...prev,
      roadmap: {
        ...prev.roadmap,
        fases: addNewItem(prev.roadmap.fases, createNewFase())
      }
    }));
    updateUltimaAtualizacao();
  };

  const updateFase = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      roadmap: {
        ...prev.roadmap,
        fases: updateItemText(prev.roadmap.fases, id, field, value)
      }
    }));
    updateUltimaAtualizacao();
  };

  const updateFaseStatus = (id: string, status: "Completo" | "Em Andamento" | "Pendente") => {
    setData(prev => {
      const updatedFases = prev.roadmap.fases.map(fase => {
        if (fase.id === id) {
          return { ...fase, status };
        }
        return fase;
      });
      
      return {
        ...prev,
        roadmap: {
          ...prev.roadmap,
          fases: updatedFases
        }
      };
    });
    updateUltimaAtualizacao();
  };

  const removeFase = (id: string) => {
    setData(prev => ({
      ...prev,
      roadmap: {
        ...prev.roadmap,
        fases: removeItem(prev.roadmap.fases, id)
      }
    }));
    updateUltimaAtualizacao();
  };

  const addTarefaToFaseImpl = (faseId: string) => {
    setData(prev => {
      const updatedFases = addTarefaToFase(prev.roadmap.fases, faseId);
      
      // Recalcular progresso da fase
      const updatedFasesWithProgress = updatedFases.map(fase => {
        if (fase.id === faseId) {
          return {
            ...fase,
            progresso: calculateFaseProgress(fase)
          };
        }
        return fase;
      });
      
      return {
        ...prev,
        roadmap: {
          ...prev.roadmap,
          fases: updatedFasesWithProgress
        }
      };
    });
    updateUltimaAtualizacao();
  };

  const updateTarefa = (faseId: string, tarefaId: string, field: string, value: string) => {
    setData(prev => {
      const updatedFases = prev.roadmap.fases.map(fase => {
        if (fase.id === faseId) {
          return {
            ...fase,
            tarefas: fase.tarefas.map(tarefa => {
              if (tarefa.id === tarefaId) {
                return { ...tarefa, [field]: value };
              }
              return tarefa;
            })
          };
        }
        return fase;
      });
      
      return {
        ...prev,
        roadmap: {
          ...prev.roadmap,
          fases: updatedFases
        }
      };
    });
    updateUltimaAtualizacao();
  };

  const updateTarefaStatus = (faseId: string, tarefaId: string, status: StatusType) => {
    setData(prev => {
      const updatedFases = prev.roadmap.fases.map(fase => {
        if (fase.id === faseId) {
          const updatedTarefas = fase.tarefas.map(tarefa => {
            if (tarefa.id === tarefaId) {
              return { ...tarefa, status };
            }
            return tarefa;
          });
          
          return {
            ...fase,
            tarefas: updatedTarefas,
            progresso: calculateFaseProgress({ ...fase, tarefas: updatedTarefas })
          };
        }
        return fase;
      });
      
      return {
        ...prev,
        roadmap: {
          ...prev.roadmap,
          fases: updatedFases
        }
      };
    });
    updateUltimaAtualizacao();
  };

  const removeTarefa = (faseId: string, tarefaId: string) => {
    setData(prev => {
      const updatedFases = prev.roadmap.fases.map(fase => {
        if (fase.id === faseId) {
          const updatedTarefas = fase.tarefas.filter(tarefa => tarefa.id !== tarefaId);
          return {
            ...fase,
            tarefas: updatedTarefas,
            progresso: calculateFaseProgress({ ...fase, tarefas: updatedTarefas })
          };
        }
        return fase;
      });
      
      return {
        ...prev,
        roadmap: {
          ...prev.roadmap,
          fases: updatedFases
        }
      };
    });
    updateUltimaAtualizacao();
  };

  // Funções para Ações Imediatas
  const addAcaoImediata = () => {
    const newAcao: AcaoImediata = {
      id: uuidv4(),
      tipo: "Definir",
      descricao: "Nova ação imediata",
      status: "pendente"
    };

    setData(prev => ({
      ...prev,
      acoesImediatas: [...prev.acoesImediatas, newAcao]
    }));
    updateUltimaAtualizacao();
  };

  const updateAcaoImediata = (id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      acoesImediatas: prev.acoesImediatas.map(acao => {
        if (acao.id === id) {
          return { ...acao, [field]: value };
        }
        return acao;
      })
    }));
    updateUltimaAtualizacao();
  };

  const updateAcaoImediataStatus = (id: string, status: "completo" | "pendente") => {
    setData(prev => ({
      ...prev,
      acoesImediatas: prev.acoesImediatas.map(acao => {
        if (acao.id === id) {
          return { ...acao, status };
        }
        return acao;
      })
    }));
    updateUltimaAtualizacao();
  };

  const removeAcaoImediata = (id: string) => {
    setData(prev => ({
      ...prev,
      acoesImediatas: prev.acoesImediatas.filter(acao => acao.id !== id)
    }));
    updateUltimaAtualizacao();
  };

  // Função para exportar dados
  const saveDataToJSON = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `business-plan-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const contextValue: DataContextType = {
    data,
    activeSection,
    setActiveSection,
    updateVisao,
    updateUltimaAtualizacao,
    
    // Estrategia de Negocio
    addPublicoAlvo,
    updatePublicoAlvo,
    removePublicoAlvo,
    
    addDiferencial,
    updateDiferencial,
    removeDiferencial,
    
    updatePropostaValorDeclaracao,
    
    addModeloMonetizacao,
    updateModeloMonetizacao,
    removeModeloMonetizacao,
    
    // MVP
    addFuncionalidadeEssencial,
    updateFuncionalidadeEssencial,
    updateFuncionalidadeEssencialStatus,
    removeFuncionalidadeEssencial,
    
    addSubItemToFuncionalidade,
    updateSubItemStatus: updateSubItemStatusImpl,
    updateSubItemText: updateSubItemTextImpl,
    removeSubItem: removeSubItemImpl,
    
    addFuncionalidadeForaMVP,
    updateFuncionalidadeForaMVP,
    updateFuncionalidadeForaMVPStatus,
    removeFuncionalidadeForaMVP,
    
    addRequisitoNaoFuncional,
    updateRequisitoNaoFuncional,
    updateRequisitoNaoFuncionalStatus,
    removeRequisitoNaoFuncional,
    
    // Roadmap
    addFase,
    updateFase,
    updateFaseStatus,
    removeFase,
    
    addTarefaToFase: addTarefaToFaseImpl,
    updateTarefa,
    updateTarefaStatus,
    removeTarefa,
    
    // Acoes Imediatas
    addAcaoImediata,
    updateAcaoImediata,
    updateAcaoImediataStatus,
    removeAcaoImediata,
    
    // Persistência
    saveDataToJSON
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};