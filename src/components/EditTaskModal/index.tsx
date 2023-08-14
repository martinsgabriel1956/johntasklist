import { useContext, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { PencilSimpleLine, X } from 'phosphor-react';
import clsx from 'clsx';
import { Separator, ModalSubtask } from '..';
import { TaskType } from '../../interfaces/TaskType';
import { TasksContext } from '../../context/TasksContext';
import { SubtaskInput } from '../UI/SubtaskInput';
import { ThemeContext } from '../../context/ThemeContext';

interface EditTaskModalProps {
  isOpenModal: boolean;
  setIsOpenModal: () => void;
  task: TaskType;
}

export function EditTaskModal({ isOpenModal, setIsOpenModal, task }: EditTaskModalProps) {
  const [isEditTaskTitle, setIsEditTaskTitle] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title ?? "");
  const { generateNewSubtaskInput, subtasks, clearSubtasksInput, editTitle } = useContext(TasksContext);
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
    setIsEditTaskTitle(false);
    setTaskTitle(task.title ?? "")
  }

  function handleChangeEditTitleStatus() {
    setIsEditTaskTitle(true);
  }

  return (
    <>
      <Dialog.Root open={isOpenModal} onOpenChange={setIsOpenModal}>
        <Dialog.Trigger
          type='button'
          title="Edit task"
        >
          <PencilSimpleLine size={24} />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay
            className={clsx(' fixed inset-0 w-full h-full', {
              "bg-zinc-800": theme === "dark",
              "bg-zinc-50": theme === "light"
            })}
          />
          <Dialog.Content
            className={clsx(' fixed max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-4 w-full', {
              "bg-dark-purple/30": theme === "dark",
              "bg-dark-text/40": theme === "light"
            })}
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
                  onClick={setIsOpenModal}
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
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root >
    </>
  );
}