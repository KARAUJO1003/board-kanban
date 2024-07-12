export const ItemTypes = {
  BOX: "box",
};

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

export interface DragItem {
  id: string;
  status: string;
}