import { createContext } from "react";
import { TaskType } from "../interfaces/TaskType";

interface TasksContextTypes {
  addNewTask: (task: string) => void;
  deleteTask: (taskId: string) => void;
  allTasks: TaskType[];
  completeTask: (taskId: string) => void;
}

export const TasksContext = createContext({} as TasksContextTypes);
