import { v4 as uuidv4 } from 'uuid';
import { Diferencial, Fase, Funcionalidade, PublicoAlvo, RequisitoNaoFuncional, StatusType, SubItem, Tarefa } from '../types';

export const updateItemStatus = <T extends { id: string; status: StatusType }>(
  items: T[],
  itemId: string,
  newStatus: StatusType
): T[] => {
  return items.map(item => {
    if (item.id === itemId) {
      return { ...item, status: newStatus };
    }
    return item;
  });
};

export const updateItemText = <T extends { id: string; [key: string]: any }>(
  items: T[],
  itemId: string,
  field: string,
  newText: string
): T[] => {
  return items.map(item => {
    if (item.id === itemId) {
      return { ...item, [field]: newText };
    }
    return item;
  });
};

export const addNewItem = <T extends { id: string }>(
  items: T[],
  newItem: Omit<T, 'id'>
): T[] => {
  const itemWithId = { 
    ...newItem, 
    id: uuidv4() 
  } as T;
  
  return [...items, itemWithId];
};

export const removeItem = <T extends { id: string }>(
  items: T[],
  itemId: string
): T[] => {
  return items.filter(item => item.id !== itemId);
};

export const createNewPublicoAlvo = (): PublicoAlvo => ({
  id: uuidv4(),
  titulo: "Novo Público-Alvo",
  descricao: "Descrição do novo público-alvo"
});

export const createNewDiferencial = (): Diferencial => ({
  id: uuidv4(),
  titulo: "Novo Diferencial",
  descricao: "Descrição do novo diferencial"
});

export const createNewFuncionalidade = (): Funcionalidade => ({
  id: uuidv4(),
  titulo: "Nova Funcionalidade",
  descricao: "Descrição da nova funcionalidade",
  status: "pendente"
});

export const createNewSubItem = (): SubItem => ({
  id: uuidv4(),
  titulo: "Novo Sub-item",
  status: "pendente"
});

export const createNewRequisitoNaoFuncional = (): RequisitoNaoFuncional => ({
  id: uuidv4(),
  titulo: "Novo Requisito Não-Funcional",
  status: "pendente"
});

export const createNewFase = (): Fase => ({
  id: uuidv4(),
  titulo: "Nova Fase",
  status: "Pendente",
  progresso: 0,
  tarefas: []
});

export const createNewTarefa = (): Tarefa => ({
  id: uuidv4(),
  titulo: "Nova Tarefa",
  status: "pendente"
});

export const updateSubItemStatus = (
  funcionalidades: Funcionalidade[],
  funcionalidadeId: string,
  subItemId: string,
  newStatus: StatusType
): Funcionalidade[] => {
  return funcionalidades.map(func => {
    if (func.id === funcionalidadeId && func.subItens) {
      return {
        ...func,
        subItens: func.subItens.map(subItem => {
          if (subItem.id === subItemId) {
            return { ...subItem, status: newStatus };
          }
          return subItem;
        })
      };
    }
    return func;
  });
};

export const addSubItem = (
  funcionalidades: Funcionalidade[],
  funcionalidadeId: string
): Funcionalidade[] => {
  return funcionalidades.map(func => {
    if (func.id === funcionalidadeId) {
      const newSubItem = createNewSubItem();
      return {
        ...func,
        subItens: func.subItens ? [...func.subItens, newSubItem] : [newSubItem]
      };
    }
    return func;
  });
};

export const removeSubItem = (
  funcionalidades: Funcionalidade[],
  funcionalidadeId: string,
  subItemId: string
): Funcionalidade[] => {
  return funcionalidades.map(func => {
    if (func.id === funcionalidadeId && func.subItens) {
      return {
        ...func,
        subItens: func.subItens.filter(subItem => subItem.id !== subItemId)
      };
    }
    return func;
  });
};

export const updateSubItemText = (
  funcionalidades: Funcionalidade[],
  funcionalidadeId: string,
  subItemId: string,
  newText: string
): Funcionalidade[] => {
  return funcionalidades.map(func => {
    if (func.id === funcionalidadeId && func.subItens) {
      return {
        ...func,
        subItens: func.subItens.map(subItem => {
          if (subItem.id === subItemId) {
            return { ...subItem, titulo: newText };
          }
          return subItem;
        })
      };
    }
    return func;
  });
};

export const addTarefaToFase = (
  fases: Fase[],
  faseId: string
): Fase[] => {
  return fases.map(fase => {
    if (fase.id === faseId) {
      const newTarefa = createNewTarefa();
      return {
        ...fase,
        tarefas: [...fase.tarefas, newTarefa]
      };
    }
    return fase;
  });
};