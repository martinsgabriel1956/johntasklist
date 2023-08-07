import { ReactNode, useState } from "react";
// import { useQueryClient, useQuery, useMutation } from 'react-query';
import { v4 as uuid } from 'uuid';
import { TasksContext } from "../context/TasksContext";
import { TaskType } from "../interfaces/TaskType";

export interface TasksProviderProps {
  children: ReactNode;
}

export const TasksProvider = ({ children }: TasksProviderProps) => {
  const [allTasks, setAllTasks] = useState<TaskType[]>([]);
  // const queryClient = useQueryClient();
  // const tasks = useQuery("ToDos")

  // const mutation = useMutation<TaskType>("ToDos", {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("ToDos");
  //   }
  // });

  function addNewTask(task: string) {
    const newTask: TaskType = {
      id: uuid(),
      title: task,
      isFullest: false,
    }

    // mutation.mutate();

    setAllTasks(prevState => [...prevState, newTask]);
  }

  function deleteTask(taskId: string) {
    setAllTasks(prevState => prevState.filter(task => task.id !== taskId));
  }

  function completeTask(taskId: string) {
    setAllTasks(prevState => prevState.map(task => task.id === taskId ? { ...task, isCompleted: !task.isFullest } : task));
  }

  function uncheckCompletedTask(taskId: string) {
    setAllTasks(prevState => prevState.map(task => task.id === taskId ? { ...task, isCompleted: false } : task));
  }

  return (
    <TasksContext.Provider value={{ addNewTask, deleteTask, allTasks, completeTask, uncheckCompletedTask }}>
      {children}
    </TasksContext.Provider>
  )
}