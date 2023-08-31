import { createContext } from "react";
import { TaskType } from "../interfaces/TaskType";
import { SubtaskType } from "../interfaces/SubtaskType";

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
  generateNewSubtaskInput: () => void;
  deleteTask: (taskId: string) => void;
  deleteSubtask: (taskId: string, subtaskId: string) => void;
  deleteSubtaskInput: (subtaskId: string) => void;
  allTasks: TaskType[];
  subtasks: SubtaskType[];
  isEditMode: boolean;
  completeTask: (id: string) => void;
  checkSubtask: (subtaskId: string) => void;
  uncheckCompletedTask: (taskId: string) => void;
  uncheckCompletedSubtask: (subtaskId: string) => void;
  updateTaskList: (taskList: TaskType[]) => void;
  updateSubtaskList: (subtaskList: SubtaskType[], taskId: string) => void;
  clearSubtasksInput: () => void;
  editSubtask: (subtaskId: string, taskId: string, title: string) => void;
  editTitle: (taskId: string, title: string) => void;
  editDescription: (taskId: string, description: string) => void;
  changeIsEditModeStatus: (status: boolean) => void;
  changeIsEditableStatus: (
    status: boolean,
    taskId: string,
    subtaskId: string
  ) => void;
  isEditTaskTitle: boolean;
  changeIsEditTaskTitleStatus: (status: boolean) => void;
}

export const TasksContext = createContext({} as TasksContextTypes);
