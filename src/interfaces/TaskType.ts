export interface TaskType {
  id: string;
  title: string;
  isCompleted: boolean;
  subtasks?: {
    id: string;
    title: string;
    isCompleted: boolean;
  }[];
}
