import { Ref, useContext, useState } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { DotsSix, Trash } from 'phosphor-react';
import { Checkbox, Collapse, EditTaskModal } from "..";
import { TaskType } from "../../interfaces/TaskType";
import { TasksContext } from "../../context/TasksContext";

type TasksType = Pick<TaskType, "title" | "id">;
interface TaskProps extends TasksType {
  innerRef?: Ref<HTMLLIElement>;
  provided?: DraggableProvided;
}

export function Task({ title, id, innerRef, provided }: TaskProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [checked, setChecked] = useState(false);
  const { completeTask, uncheckCompletedTask, deleteTask, allTasks } = useContext(TasksContext);
  const task = allTasks.find(task => task.id === id);

  function handleDeleteTask() {
    deleteTask(id);
  }

  function handleOpenEditModal() {
    setIsOpened(!isOpened)
  }

  function handleChecked() {
    const task = allTasks.find(task => task.title === title);
    setChecked(!checked);

    if (!checked) {
      completeTask(task!.id);

    } else {
      uncheckCompletedTask(task!.id);
    }
  }

  return (
    <li
      key={title}
      className="flex items-center justify-between mb-8"
      ref={innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
    >
      <div className="flex items-center gap-4 relative">
        <button title="Drag task">
          <DotsSix size={32} weight="bold" />
        </button>
        <Checkbox
          text={title}
          onCheckedChange={handleChecked}
          checked={checked}
        />
      </div>

      <div className="flex items-center gap-3">
        <EditTaskModal
          isOpenModal={isOpened}
          setIsOpenModal={handleOpenEditModal}
          task={task!}
        />

        <button
          title="Delete task"
          type="button"
          onClick={handleDeleteTask}
        >
          <Trash size={24} />
        </button>


        {task?.subtasks && (
          <Collapse />
        )}

      </div>

    </li>
  );
}