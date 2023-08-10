import { Ref, useContext, useState } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { DotsSix, Trash } from 'phosphor-react';
import clsx from 'clsx';
import { Checkbox, Collapse, EditTaskModal } from "..";
import { TaskType } from "../../interfaces/TaskType";
import { TasksContext } from "../../context/TasksContext";
import { ThemeContext } from "../../context/ThemeContext";

type TasksType = Pick<TaskType, "title" | "id">;
export interface TaskProps extends TasksType {
  innerRef?: Ref<HTMLLIElement>;
  provided?: DraggableProvided;
}

export function Task({ title, id, innerRef, provided }: TaskProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [checked, setChecked] = useState(false);
  const { completeTask, uncheckCompletedTask, deleteTask, allTasks, subtasks, clearSubtasksInput, isEditMode, changeIsEditModeStatus } = useContext(TasksContext);
  const { theme } = useContext(ThemeContext);
  const task = allTasks.find(task => task.id === id);

  function handleDeleteTask() {
    deleteTask(id);
  }

  function handleOpenEditModal() {
    setIsOpened(!isOpened)
    const hasSubtasksInput = !isOpened && subtasks.length > 0;

    if (hasSubtasksInput || isEditMode) {
      clearSubtasksInput();
      changeIsEditModeStatus(false);
    }
  }

  function handleChecked() {
    const task = allTasks.find(task => task.title === title)
    setChecked(!checked);

    if (!checked) {
      completeTask(task!.id)
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
          <DotsSix size={32} weight="bold" className={`${theme === "dark" ? "text-white" : "text-light-text"}`} />
        </button>
        <Checkbox
          text={title}
          onCheckedChange={handleChecked}
          checked={checked}
        />
      </div>

      <div
        className={clsx("flex items-center gap-3", {
          "text-white": theme === "dark",
          "text-light-text": theme === "light"
        })}
      >
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

        {task?.subtasks && task.subtasks.length > 0 && (
          <Collapse />
        )}
      </div>
    </li>
  );
}