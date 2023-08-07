import { Article, Check, X } from "phosphor-react";
import { ComponentProps } from "react";

export interface SubtaskProps extends ComponentProps<"div"> { }

export function Subtask({ className, ...props }: SubtaskProps) {
  function handleAddSubtask() {

  }

  return (
    <div className={` text-white ${className}`} {...props}>

      <div className="flex items-center gap-4">
        <Article size={24} weight="bold" />
        <input
          title="Subtask"
          type="text"
          placeholder="Subtask"
          className="w-full mx-auto h-12 bg-transparent outline-none cursor-text"
        />

        <div className="flex items-center gap-2">
          <button
            type="button"
            title=""
            className=""
          >
            <Check
              size={20}
              weight='bold'
            />
          </button>
          <button
            type="button"
            className=""
            onClick={handleAddSubtask}
          >
            <X size={20} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  )
}