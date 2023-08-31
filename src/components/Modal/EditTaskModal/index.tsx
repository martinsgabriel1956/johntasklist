import { useContext, useState, useRef } from 'react';
import { PencilSimpleLine, X } from 'phosphor-react';
import clsx from 'clsx';
import { ThemeContext } from '../../../context/ThemeContext';
import { TasksContext } from '../../../context/TasksContext';
import { TaskType } from '../../../interfaces/TaskType';
import { Modal, ModalSubtask, Separator, SubtaskInput } from '../..';

interface EditTaskModalProps {
  task: TaskType;
}

export function EditTaskModal({ task }: EditTaskModalProps) {
  const taskInputRef = useRef<HTMLInputElement>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title ?? "");
  const { generateNewSubtaskInput, subtasks, clearSubtasksInput, editTitle, isEditTaskTitle, changeIsEditTaskTitleStatus, isEditMode, changeIsEditModeStatus } = useContext(TasksContext);
  const { theme } = useContext(ThemeContext);
  const hasSeparator = task.subtasks && task.subtasks.length > 0 || subtasks.length > 0;

  function handleGenerateNewSubtask() {
    if (subtasks.length > 0) {
      clearSubtasksInput();
    }

    generateNewSubtaskInput();
  }

  function handleEditTitle() {
    editTitle(task.id, taskTitle);
    changeIsEditTaskTitleStatus(false);
    setTaskTitle(task.title ?? "")
  }

  function handleChangeEditTitleStatus() {
    changeIsEditTaskTitleStatus(true);
  }

  function handleChangeModalStatus() {
    setIsOpenModal(!isOpenModal);

    const hasSubtasksInput = !isOpenModal && subtasks.length > 0;

    if (hasSubtasksInput || isEditMode) {
      clearSubtasksInput();
      changeIsEditModeStatus(false);
    }

    changeIsEditTaskTitleStatus(false);
  }

  console.log({ isEditTaskTitle });

  return (
    <>
      <Modal
        isOpenModal={isOpenModal}
        setIsOpenModal={handleChangeModalStatus}
        type='edit'
      >
        <div className="flex items-center justify-between gap-16 mb-8">
          <div className='flex gap-1 group'>
            {!isEditTaskTitle ? (
              <>
                <h1
                  className={clsx("font-bold leading-normal text-3xl group-hover:underline", {
                    "text-white": theme === "dark",
                    "text-dark-bg": theme === "light",
                  })}
                >
                  {task?.title}
                </h1>
                <button
                  title='Edit task title'
                  className='hidden group-hover:inline-block pt-4'
                  onClick={handleChangeEditTitleStatus}
                  type='button'
                >
                  <PencilSimpleLine
                    size={16}
                    weight='bold'
                    className={clsx('', {
                      "text-dark-purple": theme === "dark",
                      "text-dark-bg": theme === "light",
                    })}
                  />
                </button>
              </>

            ) : (
              <>
                <input
                  title='Change title input'
                  type="text"
                  onBlur={handleEditTitle}
                  value={taskTitle}
                  ref={taskInputRef}
                  onChange={event => setTaskTitle(event.target.value)}
                  className={clsx("w-full font-bold leading-normal text-3xl mx-auto h-12 bg-transparent outline-none cursor-text", {
                    "text-white": theme === "dark",
                    "text-dark-purple": theme === "light"
                  })}
                />
              </>
            )}
          </div>
          <div className="">
            <button
              type="button"
              className="top-3.5 right-4"
              onClick={handleChangeModalStatus}
              title="Add new ToDo input"
            >
              <X
                className={clsx("w-6 h-6", {
                  "text-white": theme === "dark",
                  "text-dark-bg": theme === "light",
                })}
                weight='bold'
              />
            </button>
          </div>
        </div>
        <div className="">
          <button
            className={clsx('border-2 border-solid rounded-md p-3 hover:bg-gradient-to-r transition-all', {
              "bg-dark-purple/30": theme === "dark",
              "border-dark-checkboxBorder": theme === "dark",
              "text-white": theme === "dark",
              "hover:from-dark-gradientFrom": theme === "dark",
              "hover:to-dark-gradientTo": theme === "dark",
              "border-dark-text/90": theme === "light",
              "hover:from-light-gradientFrom": theme === "light",
              "hover:to-light-gradientTo": theme === "light",
            })}
            type='button'
            onClick={handleGenerateNewSubtask}
          >
            Add Subtask
          </button>
        </div>


        {hasSeparator && (
          <Separator
            className='mt-6 bg-dark-border'
          />
        )}

        {subtasks?.map(subtask => (
          <SubtaskInput
            key={subtask.id}
            className="mt-4"
            subtaskId={subtask.id}
            taskId={task?.id}
          />
        ))}

        {task?.subtasks && task.subtasks.map(subtask => (
          <ModalSubtask
            key={subtask.id}
            className="mt-4"
            subtaskId={subtask.id}
            taskId={task.id}
            title={subtask.title}
          />
        ))}
      </Modal>
    </>
  );
}