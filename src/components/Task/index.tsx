import { useContext, useState } from "react";
import { PencilSimpleLine, Trash } from 'phosphor-react';
import { TaskType } from "../../interfaces/TaskType";
import { Checkbox } from "..";
import { TasksContext } from "../../context/TasksContext";
import { EditTaskModal } from "../UI/EditTaskModal";
import { Collapse } from "../UI/Collapse";

type TaskProps = Pick<TaskType, "title" | "id">;

export function Task({ title, id }: TaskProps) {
  const [isOpened, setIsOpened] = useState(false);
  const { deleteTask } = useContext(TasksContext);

  function handleDeleteTask() {
    deleteTask(id);
  }

  // function handleEditTask() {
  //   // Code    
  // }

  function handleOpenEditModal() {
    setIsOpened(!isOpened)
  }

  return (
    <li
      key={title}
      className="flex items-center justify-between mb-8"
      draggable
    >
      <Checkbox
        text={title}
      />

      <div className="flex items-center gap-3">
        <EditTaskModal
          isOpenModal={isOpened}
          setIsOpenModal={handleOpenEditModal}
        />

        <button
          type="button"
          onClick={handleDeleteTask}
        >
          <Trash size={28} />
        </button>
        <Collapse />
      </div>

    </li>
  );
}