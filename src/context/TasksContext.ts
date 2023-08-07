import { createContext } from "react";
import { TaskType } from "../interfaces/TaskType";
// import { UseQueryResult } from "react-query";

interface TasksContextTypes {
  addNewTask: (task: string) => void;
  deleteTask: (taskId: string) => void;
  allTasks: TaskType[];
  completeTask: (taskId: string) => void;
  uncheckCompletedTask: (taskId: string) => void;
  updateTaskList: (taskList: TaskType[]) => void;
  addSubtask: (
    taskId: string,
    subtask: {
      title: string;
      isCompleted: boolean;
    }
  ) => void;
}

export const TasksContext = createContext({} as TasksContextTypes);
