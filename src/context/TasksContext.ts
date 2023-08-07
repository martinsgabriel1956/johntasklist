import { createContext } from "react";
import { TaskType } from "../interfaces/TaskType";
// import { UseQueryResult } from "react-query";

interface TasksContextTypes {
  addNewTask: (task: string) => void;
  deleteTask: (taskId: string) => void;
  allTasks: TaskType[];
  completeTask: (taskId: string) => void;
  uncheckCompletedTask: (taskId: string) => void;
  // tasks: UseQueryResult<unknown, unknown>;
}

export const TasksContext = createContext({} as TasksContextTypes);
