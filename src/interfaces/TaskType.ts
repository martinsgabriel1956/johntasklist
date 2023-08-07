export interface TaskType {
  id: string;
  title: string;
  isCompleted: boolean;
  subtasks?: {
    title: string;
    isCompleted: boolean;
  }[];
}
