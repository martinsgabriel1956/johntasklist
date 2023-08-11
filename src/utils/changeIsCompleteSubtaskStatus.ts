import { TaskType } from "../interfaces/TaskType";

export function changeIsCompetedSubtaskStatus(
  state: TaskType[],
  subtaskId: string,
  status: boolean
) {
  return state.map((task) => {
    if (task.subtasks?.find((subtask) => subtask.id === subtaskId)) {
      return {
        ...task,
        subtasks: task.subtasks?.map((subtask) =>
          subtask.id === subtaskId
            ? { ...subtask, isCompleted: status }
            : subtask
        ),
      };
    }
    return task;
  });
}
