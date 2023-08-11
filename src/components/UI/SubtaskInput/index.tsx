import { Article, Check, X } from "phosphor-react";
import { ComponentProps, useContext, useState } from "react";
import clsx from 'clsx';
import { TasksContext } from "../../../context/TasksContext";
import { ThemeContext } from "../../../context/ThemeContext";

interface SubtaskInputProps extends ComponentProps<"div"> {
  taskId: string;
  subtaskId: string;
  className?: string;
}

export function SubtaskInput({ subtaskId, taskId, className, title }: SubtaskInputProps) {
  const { addNewSubtask, deleteSubtaskInput, editSubtask, isEditMode, changeIsEditModeStatus, deleteSubtask, changeIsEditableStatus } = useContext(TasksContext);
  const { theme } = useContext(ThemeContext);
  const [subtaskTitle, setSubtaskTitle] = useState(isEditMode ? title : "");

  function handleAddSubtask() {
    const isEmpty = subtaskTitle?.trim() === "";

    if (isEmpty) {
      return;
    }

    const subtask = {
      id: subtaskId,
      title: subtaskTitle!,
      isCompleted: false,
    }

    addNewSubtask(taskId, subtask);
  }

  function handleDeleteSubtask() {
    if (isEditMode) {
      deleteSubtask(subtaskId, taskId);
      changeIsEditModeStatus(false);
    }

    deleteSubtaskInput(subtaskId);
  }

  function handleEditSubtask() {
    editSubtask(taskId, subtaskId, subtaskTitle!);
    changeIsEditModeStatus(false);
    changeIsEditableStatus(false, taskId, subtaskId);
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Article
        size={26} weight="bold"
        className={clsx("", {
          "text-white": theme === "dark",
          "text-dark-bg": theme === "light"
        })}
      />
      <input
        title="Subtask"
        type="text"
        placeholder="Subtask"
        className={clsx("w-full mx-auto h-12 bg-transparent outline-none cursor-text", {
          "text-white": theme === "dark",
          "text-dark-purple": theme === "light"
        })}
        value={subtaskTitle}
        onChange={event => setSubtaskTitle(event.target.value)}
      />

      <div
        className={clsx("flex items-center gap-2", {
          "text-white": theme === "dark",
          "text-dark-purple": theme === "light"
        })}
      >
        <button
          type="button"
          title="Confirm subtask"
          className=""
          onClick={isEditMode ? handleEditSubtask : handleAddSubtask}
        >
          <Check
            size={20}
            weight='bold'
          />
        </button>
        <button
          type="button"
          className=""
          title="Delete Subtask"
          onClick={handleDeleteSubtask}
        >
          <X size={20} weight="bold" />
        </button>
      </div>
    </div>
  );
}