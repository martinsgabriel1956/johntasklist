import { ReactNode, useState } from "react";
import { v4 as uuid } from 'uuid';
import { TasksContext } from "../context/TasksContext";
import { TaskType } from "../interfaces/TaskType";
import { SubtaskType } from "../interfaces/SubtaskType";
import { changeIsCompletedTaskStatus } from "../utils/changeIsCompletedTaskStatus";
import { changeIsCompetedSubtaskStatus } from "../utils/changeIsCompleteSubtaskStatus";

export interface TasksProviderProps {
  children: ReactNode;
}

export const TasksProvider = ({ children }: TasksProviderProps) => {
  const [allTasks, setAllTasks] = useState<TaskType[]>([]);
  const [subtasks, setSubtasks] = useState<SubtaskType[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditTaskTitle, setIsEditTaskTitle] = useState(false);

  function addNewTask(task: string) {
    const newTask: TaskType = {
      id: uuid(),
      title: task,
      isCompleted: false,
    }

    setAllTasks(prevState => [...prevState, newTask]);
  }

  function addNewSubtask(
    taskId: string,
    subtask: {
      id: string;
      title: string;
      isCompleted: boolean;
    }) {

    setAllTasks(prevState => prevState.map(task => {
      if (task.id === taskId) {
        return { ...task, subtasks: task.subtasks ? [...task.subtasks, subtask] : [subtask] };
      }
      return task;
    }))

    setSubtasks(prevState => prevState.filter(subtask => subtask.id !== subtask.id));
  }

  function generateNewSubtaskInput() {
    const subtask = {
      id: uuid(),
      title: '',
      isCompleted: false,
    }

    setSubtasks(prevState => [...prevState, subtask]);
  }

  function deleteTask(taskId: string) {
    setAllTasks(prevState => prevState.filter(task => task.id !== taskId));
  }

  function deleteSubtask(subtaskId: string, taskId: string) {
    setAllTasks(prevState => prevState.map(task => {
      if (task.id === taskId) {
        const subtaskRemoved = task.subtasks?.filter(subtask => subtask.id !== subtaskId);
        return { ...task, subtasks: subtaskRemoved };
      }
      return task;
    }))
  }

  function deleteSubtaskInput(subtaskId: string) {
    setSubtasks(prevState => prevState.filter(subtask => subtask.id !== subtaskId));
  }

  function clearSubtasksInput() {
    setSubtasks([]);
  }

  function updateTaskList(taskList: TaskType[]) {
    setAllTasks(taskList);
  }

  function completeTask(taskId: string) {
    setAllTasks(prevState => changeIsCompletedTaskStatus(prevState, taskId, true));
  }

  function uncheckCompletedTask(taskId: string) {
    setAllTasks(prevState => changeIsCompletedTaskStatus(prevState, taskId, false));
  }

  function checkSubtask(subtaskId: string) {
    setAllTasks(prevState => changeIsCompetedSubtaskStatus(prevState, subtaskId, true));
  }

  function uncheckCompletedSubtask(subtaskId: string) {
    setAllTasks(prevState => changeIsCompetedSubtaskStatus(prevState, subtaskId, false))
  }

  function editSubtask(taskId: string, subtaskId: string, title: string) {
    setAllTasks(prevState => prevState.map(task => {
      if (task.id === taskId) {
        return { ...task, subtasks: task.subtasks?.map(subtask => subtask.id === subtaskId && subtask.title !== title ? { ...subtask, title } : subtask) };
      }
      return task;
    }));
  }

  function changeIsEditModeStatus(status: boolean) {
    setIsEditMode(status);
  }

  function changeIsEditableStatus(status: boolean, taskId: string, subtaskId: string) {
    setAllTasks(prevState => prevState.map(task => {
      if (task.id === taskId) {
        return { ...task, subtasks: task.subtasks?.map(subtask => subtask.id === subtaskId ? { ...subtask, isEditable: status } : subtask) };
      }
      return task;
    }))
  }

  function updateSubtaskList(subtaskList: SubtaskType[], taskId: string) {
    setAllTasks(prevState => prevState.map(task => {
      if (task.id === taskId) {
        return { ...task, subtasks: subtaskList };
      }
      return task;
    }))
  }

  function editTitle(taskId: string, title: string) {
    setAllTasks(prevState => prevState.map(task => {
      const hasSameId = task.id === taskId;

      if (hasSameId && title.trim() !== "") {
        return { ...task, title };
      }
      return task;
    }))
  }

  function changeIsEditTaskTitleStatus(status: boolean) {
    setIsEditTaskTitle(status);
  }

  return (
    <TasksContext.Provider value={{
      addNewTask,
      deleteTask,
      allTasks,
      subtasks,
      completeTask,
      uncheckCompletedTask,
      updateTaskList,
      addNewSubtask,
      deleteSubtask,
      checkSubtask,
      uncheckCompletedSubtask,
      generateNewSubtaskInput,
      deleteSubtaskInput,
      clearSubtasksInput,
      editSubtask,
      changeIsEditModeStatus,
      isEditMode,
      changeIsEditableStatus,
      updateSubtaskList,
      editTitle,
      isEditTaskTitle,
      changeIsEditTaskTitleStatus
    }}>
      {children}
    </TasksContext.Provider>
  )
}