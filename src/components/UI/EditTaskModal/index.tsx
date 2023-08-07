import * as Dialog from '@radix-ui/react-dialog';
import { PencilSimpleLine, X } from 'phosphor-react';

interface EditTaskModalProps {
  isOpenModal: boolean;
  setIsOpenModal: () => void;
}

export function EditTaskModal({ isOpenModal, setIsOpenModal }: EditTaskModalProps) {
  return (
    <>
      <Dialog.Root open={isOpenModal} onOpenChange={setIsOpenModal} >
        <Dialog.Trigger>
          <button type="button">
            <PencilSimpleLine size={28} />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className='bg-zinc-800 absolute inset-0' />
          <Dialog.Content className='bg-zinc-300 fixed top-1/2 left-1/2 translate-[-50%]  text-center rounded-md w-[400px] max-w-lg'>
            <div className="flex gap-16">
              <h1 className="font-bold leading-normal text-[3.5rem]">John Task List</h1>
              <div className="">
                <button>
                  <button
                    type="button"
                    className="top-3.5 right-4"
                    onClick={setIsOpenModal}
                    title="Add new ToDo input"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}