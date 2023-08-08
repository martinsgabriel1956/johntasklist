import { ReactNode, useState } from "react";
import { v4 as uuid } from 'uuid';
import { TasksContext } from "../context/TasksContext";
import { TaskType } from "../interfaces/TaskType";
import { SubtaskType } from "../interfaces/SubtaskType";

export interface TasksProviderProps {
  children: ReactNode;
}

export const TasksProvider = ({ children }: TasksProviderProps) => {
  const [allTasks, setAllTasks] = useState<TaskType[]>([]);
  const [subtasks, setSubtasks] = useState<SubtaskType[]>([]);

  function addNewTask(task: string) {
    const newTask: TaskType = {
      id: uuid(),
      title: task,
      isCompleted: false,
    }

    // mutation.mutate();

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
        return { ...task, subtasks: task.subtasks ? [...task.subtasks!, subtask] : [subtask] };
      }
      return task;
    }))

    setSubtasks(prevState => [...prevState, subtask]);
  }

  function deleteTask(taskId: string) {
    setAllTasks(prevState => prevState.filter(task => task.id !== taskId));
  }

  function deleteSubtask(subtaskId: string, taskId: string) {
    setSubtasks(prevState => prevState.filter(subtask => subtask.id !== subtaskId));
    setAllTasks(prevState => prevState.map(task => {
      if (task.id === taskId) {
        return { ...task, subtasks: task.subtasks?.filter(subtask => subtask.id !== subtaskId) };
      }
      return task;
    }))
  }

  function updateTaskList(taskList: TaskType[]) {
    setAllTasks(taskList);
  }

  function completeTask(taskId: string) {
    setAllTasks(prevState => prevState.map(task => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    }));
  }

  function completeSubtask(taskId: string, subtaskId: string) {

  }

  function uncheckCompletedTask(taskId: string) {
    setAllTasks(prevState => prevState.map(task => task.id === taskId ? { ...task, isCompleted: false } : task));
  }

  function uncheckCompletedSubtask(subtaskId: string) {
    setSubtasks(prevState => prevState.map(subtask => subtask.id === subtaskId ? { ...subtask, isCompleted: false } : subtask));
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
      completeSubtask,
      uncheckCompletedSubtask
    }}>
      {children}
    </TasksContext.Provider>
  )
}