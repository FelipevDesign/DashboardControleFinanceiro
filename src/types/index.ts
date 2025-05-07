export interface BusinessPlanData {
  ultimaAtualizacao: string;
  visao: string;
  estrategiaNegocio: EstrategiaNegocio;
  mvp: MVP;
  roadmap: Roadmap;
  acoesImediatas: AcaoImediata[];
}

export interface EstrategiaNegocio {
  publicoAlvo: PublicoAlvo[];
  propostaValor: PropostaValor;
  modeloMonetizacao: ModeloMonetizacao[];
}

export interface PublicoAlvo {
  id: string;
  titulo: string;
  descricao: string;
}

export interface PropostaValor {
  declaracao: string;
  diferenciais: Diferencial[];
}

export interface Diferencial {
  id: string;
  titulo: string;
  descricao: string;
}

export interface ModeloMonetizacao {
  id: string;
  titulo: string;
  descricao: string;
}

export interface MVP {
  funcionalidadesEssenciais: Funcionalidade[];
  funcionalidadesForaMVP: Funcionalidade[];
  requisitosNaoFuncionais: RequisitoNaoFuncional[];
}

export interface Funcionalidade {
  id: string;
  titulo: string;
  descricao: string;
  status: "completo" | "parcial" | "pendente";
  subItens?: SubItem[];
}

export interface SubItem {
  id: string;
  titulo: string;
  status: "completo" | "parcial" | "pendente";
}

export interface RequisitoNaoFuncional {
  id: string;
  titulo: string;
  status: "completo" | "parcial" | "pendente";
}

export interface Roadmap {
  fases: Fase[];
}

export interface Fase {
  id: string;
  titulo: string;
  status: "Completo" | "Em Andamento" | "Pendente";
  progresso: number;
  tarefas: Tarefa[];
}

export interface Tarefa {
  id: string;
  titulo: string;
  status: "completo" | "parcial" | "pendente";
}

export interface AcaoImediata {
  id: string;
  tipo: string;
  descricao: string;
  status: "completo" | "pendente";
}

export type Section = 
  | "visaogeral" 
  | "estrategia" 
  | "mvp" 
  | "roadmap" 
  | "acoes";

export type StatusType = "completo" | "parcial" | "pendente";