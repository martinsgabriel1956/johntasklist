export interface TaskType {
  id: string;
  title: string;
  isFullest: boolean;
  subtasks?: {
    title: string;
    isCompleted: boolean;
  }[];
}
