import { useContext } from "react";
import { PencilSimpleLine, Trash } from 'phosphor-react';
import { TaskType } from "../../interfaces/TaskType";
import { CheckboxComponent as Checkbox } from "../Checkbox";
import { TasksContext } from "../../context/TasksContext";

type TaskProps = Pick<TaskType, "title" | "id">;

export function Task({ title, id }: TaskProps) {
  const { deleteTask } = useContext(TasksContext);
  function handleDeleteTask() {
    deleteTask(id);
  }

  function handleMarkTaskAsComplete() {

  }

  function handleEditTask() {

  }

  return (
    <li key={title} className="flex items-center justify-between mb-8">
      <Checkbox
        text={title}
      />

      <div className="flex items-center gap-3">
        <button type="button">
          <PencilSimpleLine size={28} />
        </button>
        <button
          type="button"
          onClick={handleDeleteTask}
        >
          <Trash size={28} />
        </button>
      </div>
    </li>
  );
}