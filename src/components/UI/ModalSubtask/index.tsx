import { ComponentProps, useContext, useState } from "react";
import { PencilSimpleLine, X } from "phosphor-react";
import clsx from 'clsx';
import { TasksContext } from "../../../context/TasksContext";
import { CircleCheckbox } from "../CircleCheckbox";
import { SubtaskInput } from "../SubtaskInput";
import { ThemeContext } from "../../../context/ThemeContext";

export interface ModalSubtaskProps extends ComponentProps<"div"> {
  taskId: string;
  subtaskId: string;
  title: string;
}

export function ModalSubtask({ className, subtaskId, taskId, title, ...props }: ModalSubtaskProps) {
  const { deleteSubtask, uncheckCompletedSubtask, checkSubtask, allTasks, changeIsEditModeStatus, isEditMode, changeIsEditableStatus } = useContext(TasksContext);
  const { theme } = useContext(ThemeContext);
  const subtaskStatus = allTasks.find(task => task.id === taskId)?.subtasks?.find(subtask => subtask.id === subtaskId);
  const [checked, setChecked] = useState(subtaskStatus?.isCompleted ?? false);

  function handleDeleteSubtask() {
    deleteSubtask(subtaskId, taskId);
  }

  function handleEditSubtask() {
    changeIsEditModeStatus(true);
    changeIsEditableStatus(true, taskId, subtaskId);
  }

  function handleCheckedChange() {
    setChecked(!checked);

    if (checked) {
      uncheckCompletedSubtask(subtaskId);
    } else {
      checkSubtask(subtaskId);
    }
  }

  return (
    <div className={`${className}`} {...props}>
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-between w-full">
          {isEditMode && subtaskStatus?.isEditable ? (
            <SubtaskInput
              subtaskId={subtaskId}
              taskId={taskId}
              className="w-full"
              title={title}
            />
          ) : (
            <>
              <CircleCheckbox
                text={title}
                onCheckedChange={handleCheckedChange}
                checked={checked}
                defaultChecked={subtaskStatus ? subtaskStatus.isCompleted : false}
              />

              <div
                className={clsx("flex items-center gap-2", {
                  "text-white": theme === "dark",
                  "text-light-text": theme === "light"
                })}
              >
                <button
                  type="button"
                  title="Edit subtask"
                  className=""
                  onClick={handleEditSubtask}
                >
                  <PencilSimpleLine
                    size={20}
                    weight='bold'
                  />
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center"
                  title="Delete Subtask"
                  onClick={handleDeleteSubtask}
                >
                  <X size={20} weight="bold" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div >
  )
}