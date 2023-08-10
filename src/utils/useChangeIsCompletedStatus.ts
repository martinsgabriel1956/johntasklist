import { TaskType } from "../interfaces/TaskType";

export const changeIsCompletedStatus = (
  state: TaskType[],
  taskId: string,
  status: boolean
) => {
  return state.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        isCompleted: status,
        subtasks: task.subtasks?.map((subtask) => ({
          ...subtask,
          isCompleted: status,
        })),
      };
    }

    return task;
  });
};
