import { SubtaskType } from "./SubtaskType";

export interface TaskType {
  id: string;
  title: string;
  isCompleted: boolean;
  subtasks?: SubtaskType[];
}
