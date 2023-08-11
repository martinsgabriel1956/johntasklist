import { useContext, useState } from "react";
import { Checkbox } from "..";
import { TaskProps } from "../../Task";
import { TasksContext } from "../../../context/TasksContext";

interface SubtaskProps extends TaskProps {
  taskId: string;
}

export function Subtask({ innerRef, provided, id, title, taskId }: SubtaskProps) {
  const { allTasks, checkSubtask, uncheckCompletedSubtask } = useContext(TasksContext);
  const task = allTasks.find(task => task.id === taskId);
  const subtask = task?.subtasks && task.subtasks.find(subtask => subtask.id === id);
  const [checked, setChecked] = useState(subtask!.isCompleted ?? false);
  function handleChecked() {
    setChecked(!checked);

    if (!checked) {
      checkSubtask(subtask!.id)
    } else {
      uncheckCompletedSubtask(subtask!.id);
    }
  }

  return (
    <li
      key={id}
      className="mb-4"
      ref={innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
    >
      <Checkbox
        checked={checked}
        text={title}
        onCheckedChange={handleChecked}
      />
    </li>
  )
}