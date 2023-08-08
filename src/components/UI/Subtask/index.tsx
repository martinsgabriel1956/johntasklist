import { Article, Check, X } from "phosphor-react";
import { ComponentProps, useContext, useState } from "react";
import { TasksContext } from "../../../context/TasksContext";
import { Checkbox } from "..";

export interface SubtaskProps extends ComponentProps<"div"> {
  taskId: string;
  subtaskId: string;
}

export function Subtask({ className, subtaskId, taskId, ...props }: SubtaskProps) {
  const { subtasks, addNewSubtask, deleteSubtask, completeSubtask, uncheckCompletedSubtask } = useContext(TasksContext);
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [checked, setChecked] = useState(false);
  const hasTitle = subtasks.find(subtask => subtask.id === subtaskId && subtask.title !== "");

  function handleAddSubtask() {
    const subtask = {
      id: subtaskId,
      title: subtaskTitle,
      isCompleted: false,
    }

    addNewSubtask(taskId, subtask);
  }

  function handleDeleteSubtask() {
    deleteSubtask(taskId, hasTitle!.id);
  }

  function handleCheckedSubtask() {
    const subtask = subtasks.find(subtask => subtask.title === subtaskTitle);
    setChecked(!checked);

    if (!checked) {
      subtask && completeSubtask(taskId, subtask.id);

    } else {
      subtask && uncheckCompletedSubtask(taskId, subtask.id);
    }
  }

  return (
    <div className={` text-white ${className}`} {...props}>
      <div className="flex items-center gap-4">
        {!hasTitle ? (
          <>
            <Article size={20} weight="bold" />
            <input
              title="Subtask"
              type="text"
              placeholder="Subtask"
              className="w-full mx-auto h-12 bg-transparent outline-none cursor-text"
              value={subtaskTitle}
              onChange={e => setSubtaskTitle(e.target.value)}
            />

            <div className="flex items-center gap-2">
              <button
                type="button"
                title="Confirm subtask"
                className=""
                onClick={handleAddSubtask}
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
          </>
        ) : (
          <div className="flex items-center justify-between">
            <Checkbox
              text={hasTitle?.title}
              onCheckedChange={handleCheckedSubtask}
              checked={checked}
            />
            <div className="">
              <button
                type="button"
                className=""
                title="Delete Subtask"
              >
                <X size={20} weight="bold" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}