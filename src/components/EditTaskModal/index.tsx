import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { PencilSimpleLine, X } from 'phosphor-react';
import { v4 as uuid } from 'uuid';
import { Separator, Subtask } from '..';
import { TaskType } from '../../interfaces/TaskType';
import { SubtaskType } from '../../interfaces/SubtaskType';

interface EditTaskModalProps {
  isOpenModal: boolean;
  setIsOpenModal: () => void;
  task: TaskType;
}

export function EditTaskModal({ isOpenModal, setIsOpenModal, task }: EditTaskModalProps) {
  const [subtasks, setSubtasks] = useState<SubtaskType[]>([]);

  function handleGenerateNewSubtask() {
    const subtask = {
      id: uuid(),
      title: '',
      isCompleted: false,
    }

    setSubtasks(prevState => [...prevState, subtask])
  }

  return (
    <>
      <Dialog.Root open={isOpenModal} onOpenChange={setIsOpenModal} >
        <Dialog.Trigger
          type='button'
          title="Edit task"
        >
          <PencilSimpleLine size={24} />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className='bg-zinc-800 fixed inset-0 w-full h-full' />
          <Dialog.Content className='bg-darkPurple/30 fixed max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-4 w-full'>
            <div className="flex items-center justify-between gap-16 mb-8">
              <h1 className="font-bold leading-normal text-3xl text-white ">{task.title}</h1>
              <div className="">
                <button
                  type="button"
                  className="top-3.5 right-4"
                  onClick={setIsOpenModal}
                  title="Add new ToDo input"
                >
                  <X className="w-6 h-6 text-white font-bold" />
                </button>
              </div>
            </div>
            <div className="">
              <button
                className='border-2 border-solid border-darker rounded-md p-3 bg-darkPurple/30 text-white hover:bg-gradient-to-r hover:from-gradientFrom hover:to-gradientTo hover:transition-all'
                type='button'
                onClick={handleGenerateNewSubtask}
              >
                Add Subtasks
              </button>
            </div>

            <Separator
              className='mt-6 bg-borderDark'
            />
            {subtasks.map(subtask => (
              <Subtask
                key={subtask.id}
                className="mt-4"
                subtaskId={subtask.id}
                taskId={task.id}
              />
            ))}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}