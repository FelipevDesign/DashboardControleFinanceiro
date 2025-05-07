import { Fase, Funcionalidade, RequisitoNaoFuncional, SubItem, Tarefa } from "../types";

export const statusColors = {
  completo: "bg-green-500",
  parcial: "bg-amber-500",
  pendente: "bg-gray-300",
  "Em Andamento": "bg-amber-500",
  "Completo": "bg-green-500",
  "Pendente": "bg-gray-300"
};

export const statusText = {
  completo: "Completo",
  parcial: "Parcial",
  pendente: "Pendente",
  "Em Andamento": "Em Andamento",
  "Completo": "Completo",
  "Pendente": "Pendente"
};

export const calculateProgress = (items: Array<Funcionalidade | RequisitoNaoFuncional | Tarefa | SubItem>) => {
  if (!items.length) return 0;
  
  const completed = items.filter(item => item.status === "completo").length;
  const partial = items.filter(item => item.status === "parcial").length;
  
  return Math.round(((completed + partial * 0.5) / items.length) * 100);
};

export const calculateFaseProgress = (fase: Fase): number => {
  return calculateProgress(fase.tarefas);
};

export const calculateOverallProgress = (fases: Fase[]): number => {
  if (!fases.length) return 0;
  
  const totalTarefas = fases.reduce((acc, fase) => acc + fase.tarefas.length, 0);
  if (totalTarefas === 0) return 0;
  
  const completedTarefas = fases.reduce((acc, fase) => {
    return acc + fase.tarefas.filter(tarefa => tarefa.status === "completo").length;
  }, 0);
  
  const partialTarefas = fases.reduce((acc, fase) => {
    return acc + fase.tarefas.filter(tarefa => tarefa.status === "parcial").length;
  }, 0);
  
  return Math.round(((completedTarefas + partialTarefas * 0.5) / totalTarefas) * 100);
};