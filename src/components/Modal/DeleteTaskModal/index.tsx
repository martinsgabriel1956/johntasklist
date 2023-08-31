import { useContext, useState } from 'react';
import clsx from 'clsx';
import { ThemeContext } from '../../../context/ThemeContext';
import { Modal } from '..';
import { TasksContext } from '../../../context/TasksContext';
import { TaskType } from '../../../interfaces/TaskType';

interface ModalProps {
  task: TaskType;
}

export function DeleteTaskModal({ task }: ModalProps) {
  const { theme } = useContext(ThemeContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { deleteTask } = useContext(TasksContext);

  function handleChangeModalStatus() {
    setIsOpenModal(!isOpenModal);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function handleDeleteTask() {
    deleteTask(task.id);
  }

  return (
    <Modal
      isOpenModal={isOpenModal}
      setIsOpenModal={handleChangeModalStatus}
      type='delete'
    >
      <div className="">
        <h1
          className={clsx("font-bold leading-normal text-3xl mb-4", {
            "text-white": theme === "dark",
            "text-dark-bg": theme === "light",
          })}
        >
          {task?.title}
        </h1>
        <span className={clsx('text-lg pb-4 inline-block', {
          "text-white": theme === "dark",
          "text-dark-bg": theme === "light",
        })}>Are you sure you want to delete this task?</span>

        <div className={clsx("flex items-center justify-end gap-4", {
          "text-white": theme === "dark",
          "text-dark-bg": theme === "light",
        })}>
          <button
            type="button"
            className=""
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteTask}
            type="button"
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
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  )
}