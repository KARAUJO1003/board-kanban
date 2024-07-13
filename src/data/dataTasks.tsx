export interface ITask {
  id: number;
  title: string;
  completed: boolean;
  statusId: number; // Alterado para referenciar o id do status
  description: string;
  createdAt: string;
  completedAt?: string;
}

export interface IStatus {
  id: number;
  name: string;
  color?: string
}
export const colors = [
  { name: "Cinza claro", hex: "#D3D3D3" },
  { name: "Cinza", hex: "#808080" },
  { name: "Marrom", hex: "#8B4513" },
  { name: "Laranja", hex: "#FFA500" },
  { name: "Amarelo", hex: "#FFFF00" },
  { name: "Verde", hex: "#008000" },
  { name: "Azul", hex: "#0000FF" },
  { name: "Roxo", hex: "#800080" },
  { name: "Rosa", hex: "#FFC0CB" },
  { name: "Vermelho", hex: "#FF0000" },
];

export const statuses: IStatus[] = [
  { id: 1, name: "todo" },
  { id: 2, name: "Revisão" },
  { id: 3, name: "pending" },
  { id: 4, name: "criação" },
  { id: 5, name: "done" },
];

export const tasks: ITask[] = [
  {
    id: 1,
    title: "Finalizar relatório",
    completed: false,
    statusId: 1, // Referencia o id do status
    description: "Esta tarefa é muito importante para o projeto.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Revisar código",
    completed: true,
    statusId: 2, // Referencia o id do status
    description: "Esta tarefa foi solicitada pelo cliente.",
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Enviar e-mail para cliente",
    completed: false,
    statusId: 3, // Referencia o id do status
    description: "Esta tarefa é uma melhoria no sistema existente.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: "Testar funcionalidade",
    completed: false,
    statusId: 4, // Referencia o id do status
    description: "Esta tarefa envolve a realização de testes unitários.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    title: "Corrigir bug",
    completed: false,
    statusId: 5, // Referencia o id do status
    description: "Esta tarefa requer a correção de um bug identificado.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    title: "Implementar nova funcionalidade",
    completed: false,
    statusId: 5, // Referencia o id do status
    description: "Esta tarefa envolve a implementação de uma nova funcionalidade no sistema.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 7,
    title: "Realizar reunião com a equipe",
    completed: false,
    statusId: 1, // Referencia o id do status
    description: "Esta tarefa requer a realização de uma reunião para discutir o andamento do projeto.",
    createdAt: new Date().toISOString(),
  },
];

export const filterTasksByStatus = (tasks: ITask[], statusId: number): ITask[] => {
  return tasks?.filter(task => task.statusId === statusId);
};
