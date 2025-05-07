import { BusinessPlanData } from '../types';

const today = new Date().toLocaleDateString('pt-BR');

export const initialData: BusinessPlanData = {
  ultimaAtualizacao: today,
  visao: "Transformar o web app de controle financeiro pessoal em um SaaS lucrativo e sustentável, com foco inicial em um nicho específico, visando eventualmente uma operação semi-passiva.",
  estrategiaNegocio: {
    publicoAlvo: [
      {
        id: "pa-1",
        titulo: "Grupo: Casais Jovens (aprox. 25-40 anos), sem filhos ou com filhos pequenos.",
        descricao: "Rendas conjuntas ou separadas, despesas compartilhadas, dificuldade em manter disciplina de registro e/ou ter visão clara das finanças do casal.",
      },
      {
        id: "pa-2",
        titulo: "\"Dor\" Principal",
        descricao: "Complexidade e potencial atrito na gestão financeira conjunta, falta de visibilidade do \"todo\", dificuldade em atingir objetivos financeiros como casal devido à desorganização.",
      }
    ],
    propostaValor: {
      declaracao: "A forma mais simples e colaborativa para casais organizarem suas finanças juntos, sem estresse.",
      diferenciais: [
        {
          id: "dif-1",
          titulo: "Simplicidade Radical",
          descricao: "Foco na facilidade extrema de registro de transações."
        },
        {
          id: "dif-2",
          titulo: "Visão Compartilhada Clara",
          descricao: "Resumos e relatórios focados na unidade do casal."
        },
        {
          id: "dif-3",
          titulo: "Recursos Colaborativos (Pós-MVP Inicial)",
          descricao: "Funcionalidades pensadas para a dinâmica financeira a dois."
        },
        {
          id: "dif-4",
          titulo: "UI/UX Moderna e Agradável",
          descricao: ""
        }
      ]
    },
    modeloMonetizacao: [
      {
        id: "mon-1",
        titulo: "Modelo",
        descricao: "Teste Gratuito (Trial) de 14-30 dias, seguido por Assinatura Paga Única (Tier Único)."
      },
      {
        id: "mon-2",
        titulo: "Preço Inicial (Hipótese)",
        descricao: "R$ 9,90 - R$ 14,90 / mês (ou equivalente anual com desconto). [A ser validado/ajustado]"
      },
      {
        id: "mon-3",
        titulo: "Objetivo Inicial",
        descricao: "Validar que o nicho percebe valor suficiente para pagar, reinvestir receita inicial."
      }
    ]
  },
  mvp: {
    funcionalidadesEssenciais: [
      {
        id: "func-1",
        titulo: "Cadastro/Login Seguro (Supabase Auth)",
        descricao: "",
        status: "completo"
      },
      {
        id: "func-2",
        titulo: "Adição/Edição/Exclusão de Transações (Receita/Despesa)",
        descricao: "Precisa polir UI/UX para simplicidade radical",
        status: "completo"
      },
      {
        id: "func-3",
        titulo: "Resumo Financeiro Básico (Saldo Total, Entradas/Saídas Mês)",
        descricao: "Precisa adaptar para múltiplas contas",
        status: "completo"
      },
      {
        id: "func-4",
        titulo: "Lista/Extrato de Transações com Filtro Básico (Período)",
        descricao: "Precisa adicionar filtro por conta",
        status: "completo"
      },
      {
        id: "func-5",
        titulo: "Gerenciamento de Categorias (Padrão + Customizadas)",
        descricao: "",
        status: "completo"
      },
      {
        id: "func-6",
        titulo: "CONTAS MÚLTIPLAS (Próxima a implementar)",
        descricao: "",
        status: "pendente",
        subItens: [
          {
            id: "sub-1",
            titulo: "Modelagem DB (Tabela accounts, FK em transactions)",
            status: "pendente"
          },
          {
            id: "sub-2",
            titulo: "CRUD Básico de Contas (em data.js e Settings UI)",
            status: "pendente"
          },
          {
            id: "sub-3",
            titulo: "Seleção de Conta ao Adicionar/Editar Transação (UI)",
            status: "pendente"
          },
          {
            id: "sub-4",
            titulo: "Exibição da Conta na Lista de Transações (UI)",
            status: "pendente"
          },
          {
            id: "sub-5",
            titulo: "Atualização do Cálculo do Resumo (Saldo Total e talvez por conta)",
            status: "pendente"
          },
          {
            id: "sub-6",
            titulo: "Filtro por Conta(s) no Extrato (UI e lógica)",
            status: "pendente"
          }
        ]
      },
      {
        id: "func-7",
        titulo: "Orçamentos OU Metas (Escolher UM para o MVP)",
        descricao: "",
        status: "pendente",
        subItens: [
          {
            id: "sub-7",
            titulo: "Opção A: Orçamentos",
            status: "pendente"
          },
          {
            id: "sub-8",
            titulo: "Opção B: Metas",
            status: "pendente"
          }
        ]
      }
    ],
    funcionalidadesForaMVP: [
      {
        id: "fora-1",
        titulo: "Tags (Manter a funcionalidade existente, mas não destacar como principal)",
        descricao: "",
        status: "pendente"
      },
      {
        id: "fora-2",
        titulo: "Relatórios Avançados/Gráficos Comparativos",
        descricao: "",
        status: "pendente"
      },
      {
        id: "fora-3",
        titulo: "Recorrências (Usuários podem lançar manualmente)",
        descricao: "",
        status: "pendente"
      },
      {
        id: "fora-4",
        titulo: "Transferências entre Contas",
        descricao: "",
        status: "pendente"
      },
      {
        id: "fora-5",
        titulo: "Compartilhamento de Acesso Multi-usuário (Usar mesmo login no início)",
        descricao: "",
        status: "pendente"
      },
      {
        id: "fora-6",
        titulo: "Funcionalidades de IA (WhatsApp, etc.)",
        descricao: "",
        status: "pendente"
      },
      {
        id: "fora-7",
        titulo: "Gestão de Investimentos Detalhada",
        descricao: "",
        status: "pendente"
      },
      {
        id: "fora-8",
        titulo: "Integrações Bancárias",
        descricao: "",
        status: "pendente"
      }
    ],
    requisitosNaoFuncionais: [
      {
        id: "req-1",
        titulo: "Persistência de Dados (Supabase)",
        status: "completo"
      },
      {
        id: "req-2",
        titulo: "Testes Unitários da Lógica Principal (helpers, data, cálculos charts/recurring)",
        status: "completo"
      },
      {
        id: "req-3",
        titulo: "UI/UX Polida e Intuitiva (Foco na simplicidade do registro e visualização)",
        status: "pendente"
      },
      {
        id: "req-4",
        titulo: "Página de Destino (Landing Page) Simples",
        status: "pendente"
      },
      {
        id: "req-5",
        titulo: "Sistema de Pagamento Integrado (Ex: Stripe Checkout, Paddle, Mercado Pago)",
        status: "pendente"
      },
      {
        id: "req-6",
        titulo: "Política de Privacidade e Termos de Uso Básicos",
        status: "pendente"
      },
      {
        id: "req-7",
        titulo: "Configuração de Ambiente de Produção (Deploy básico)",
        status: "pendente"
      }
    ]
  },
  roadmap: {
    fases: [
      {
        id: "fase-1",
        titulo: "Fase 1: Desenvolvimento do MVP (Foco Casais)",
        status: "Em Andamento",
        progresso: 40,
        tarefas: [
          {
            id: "tarefa-1",
            titulo: "Estrutura Base e Autenticação",
            status: "completo"
          },
          {
            id: "tarefa-2",
            titulo: "CRUD Transações, Tags, Metas, Recorrências, Categorias, Orçamentos (Lógica data.js)",
            status: "completo"
          },
          {
            id: "tarefa-3",
            titulo: "UI Básica (Dashboard, Extrato, Modais, Settings)",
            status: "completo"
          },
          {
            id: "tarefa-4",
            titulo: "Testes Unitários da Lógica Principal",
            status: "completo"
          },
          {
            id: "tarefa-5",
            titulo: "Implementar Contas Múltiplas",
            status: "pendente"
          },
          {
            id: "tarefa-6",
            titulo: "Implementar Orçamentos OU Metas (Decidir e Implementar)",
            status: "pendente"
          },
          {
            id: "tarefa-7",
            titulo: "Polir UI/UX (Foco Simplicidade)",
            status: "pendente"
          },
          {
            id: "tarefa-8",
            titulo: "Configurar Pagamentos (Assinatura Tier Único Pós-Trial)",
            status: "pendente"
          },
          {
            id: "tarefa-9",
            titulo: "Criar Landing Page",
            status: "pendente"
          },
          {
            id: "tarefa-10",
            titulo: "Preparar Deploy Inicial",
            status: "pendente"
          }
        ]
      },
      {
        id: "fase-2",
        titulo: "Fase 2: Lançamento Beta e Validação",
        status: "Pendente",
        progresso: 0,
        tarefas: [
          {
            id: "tarefa-11",
            titulo: "Convidar Casais do Nicho para Teste Beta (Gratuito/Desconto)",
            status: "pendente"
          },
          {
            id: "tarefa-12",
            titulo: "Coletar Feedback Intensivamente (Entrevistas, Formulários)",
            status: "pendente"
          },
          {
            id: "tarefa-13",
            titulo: "Analisar Métricas Iniciais (Ativação, Retenção Básica)",
            status: "pendente"
          },
          {
            id: "tarefa-14",
            titulo: "Iterar no MVP com base no feedback (Correções, Pequenas Melhorias)",
            status: "pendente"
          },
          {
            id: "tarefa-15",
            titulo: "Validar se usuários estão dispostos a pagar após o trial",
            status: "pendente"
          }
        ]
      },
      {
        id: "fase-3",
        titulo: "Fase 3: Lançamento Público Inicial e Primeiros Clientes",
        status: "Pendente",
        progresso: 0,
        tarefas: [
          {
            id: "tarefa-16",
            titulo: "Abrir para o público geral (foco no marketing para o nicho)",
            status: "pendente"
          },
          {
            id: "tarefa-17",
            titulo: "Adquirir os primeiros clientes pagantes",
            status: "pendente"
          },
          {
            id: "tarefa-18",
            titulo: "Monitorar Métricas Chave (MRR, Churn, Ativação)",
            status: "pendente"
          },
          {
            id: "tarefa-19",
            titulo: "Oferecer Suporte Básico",
            status: "pendente"
          }
        ]
      },
      {
        id: "fase-4",
        titulo: "Fase 4: Evolução Pós-Lançamento",
        status: "Pendente",
        progresso: 0,
        tarefas: [
          {
            id: "tarefa-20",
            titulo: "Implementar o outro recurso principal (Metas ou Orçamentos)",
            status: "pendente"
          },
          {
            id: "tarefa-21",
            titulo: "Implementar Compartilhamento Real Multi-Usuário",
            status: "pendente"
          },
          {
            id: "tarefa-22",
            titulo: "Implementar Recorrências e Transferências",
            status: "pendente"
          },
          {
            id: "tarefa-23",
            titulo: "Melhorar Relatórios",
            status: "pendente"
          },
          {
            id: "tarefa-24",
            titulo: "Explorar Facilidades de Entrada de Dados (IA?)",
            status: "pendente"
          },
          {
            id: "tarefa-25",
            titulo: "Expandir para Nichos Adjacentes (se fizer sentido)",
            status: "pendente"
          },
          {
            id: "tarefa-26",
            titulo: "Otimizar Performance e Escalabilidade",
            status: "pendente"
          },
          {
            id: "tarefa-27",
            titulo: "Considerar Integrações (Bancárias, etc.)",
            status: "pendente"
          }
        ]
      }
    ]
  },
  acoesImediatas: [
    {
      id: "acao-1",
      tipo: "Definir",
      descricao: "Escolher entre Orçamentos ou Metas para o MVP",
      status: "pendente"
    },
    {
      id: "acao-2",
      tipo: "Desenvolver",
      descricao: "Implementar sistema de Contas Múltiplas (Backend e Frontend)",
      status: "pendente"
    },
    {
      id: "acao-3",
      tipo: "Desenvolver",
      descricao: "Implementar Orçamentos ou Metas (o escolhido)",
      status: "pendente"
    },
    {
      id: "acao-4",
      tipo: "Refinar",
      descricao: "Revisar e simplificar a UI/UX do fluxo de adição de transação",
      status: "pendente"
    },
    {
      id: "acao-5",
      tipo: "Refinar",
      descricao: "Revisar e simplificar a UI/UX do Resumo e Extrato (com filtro de contas)",
      status: "pendente"
    },
    {
      id: "acao-6",
      tipo: "Pesquisar/Escolher",
      descricao: "Gateway de Pagamento (Stripe, etc.)",
      status: "pendente"
    },
    {
      id: "acao-7",
      tipo: "Criar",
      descricao: "Esboço da Landing Page",
      status: "pendente"
    },
    {
      id: "acao-8",
      tipo: "Escrever",
      descricao: "Rascunho da Política de Privacidade/Termos",
      status: "pendente"
    }
  ]
};