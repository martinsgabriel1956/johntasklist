import { createContext } from "react";
import { TaskType } from "../interfaces/TaskType";
import { SubtaskType } from "../interfaces/SubtaskType";
// import { UseQueryResult } from "react-query";

interface TasksContextTypes {
  addNewTask: (task: string) => void;
  addNewSubtask: (
    taskId: string,
    subtask: {
      id: string;
      title: string;
      isCompleted: boolean;
    }
  ) => void;
  deleteTask: (taskId: string) => void;
  deleteSubtask: (taskId: string, subtaskId: string) => void;
  allTasks: TaskType[];
  subtasks: SubtaskType[];
  completeTask: (taskId: string) => void;
  completeSubtask: (taskId: string, subtaskId: string) => void;
  uncheckCompletedTask: (taskId: string) => void;
  uncheckCompletedSubtask: (taskId: string, subtaskId: string) => void;
  updateTaskList: (taskList: TaskType[]) => void;
}

export const TasksContext = createContext({} as TasksContextTypes);
