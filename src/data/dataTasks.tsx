export interface ITask {
  id: number;
  title: string;
  completed: boolean;
  status: string;
  description: string;
  createdAt: string; // Updated field
  completedAt?: string; // Updated field
}

export const tasks: ITask[] = [
  {
    id: 1,
    title: "Finalizar relatório",
    completed: false,
    status: "todo",
    description: "Esta tarefa é muito importante para o projeto.",
    createdAt: new Date().toISOString(), // Updated value
  },
  {
    id: 2,
    title: "Revisar código",
    completed: true,
    status: "Revisão",
    description: "Esta tarefa foi solicitada pelo cliente.",
    createdAt: new Date().toISOString(), // Updated value
    completedAt: new Date().toISOString(), // Updated value
  },
  {
    id: 3,
    title: "Enviar e-mail para cliente",
    completed: false,
    status: "pending",
    description: "Esta tarefa é uma melhoria no sistema existente.",
    createdAt: new Date().toISOString(), // Updated value
  },
  // Add more tasks here, if needed
  {
    id: 4,
    title: "Testar funcionalidade",
    completed: false,
    status: "criação",
    description: "Esta tarefa envolve a realização de testes unitários.",
    createdAt: new Date().toISOString(), // Updated value
  },
  {
    id: 5,
    title: "Corrigir bug",
    completed: false,
    status: "done",
    description: "Esta tarefa requer a correção de um bug identificado.",
    createdAt: new Date().toISOString(), // Updated value
  },
  {
    id: 6,
    title: "Implementar nova funcionalidade",
    completed: false,
    status: "done",
    description: "Esta tarefa envolve a implementação de uma nova funcionalidade no sistema.",
    createdAt: new Date().toISOString(), // Updated value
  },
  {
    id: 7,
    title: "Realizar reunião com a equipe",
    completed: false,
    status: "todo",
    description: "Esta tarefa requer a realização de uma reunião para discutir o andamento do projeto.",
    createdAt: new Date().toISOString(), // Updated value
  },
];

export const filterTasksByStatus = (tasks: ITask[], status: string): ITask[] => {
  return tasks?.filter(task => task.status === status);
};