import { ReactNode, useContext } from 'react';
import { PencilSimpleLine, Trash } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { ThemeContext } from '../../context/ThemeContext';

interface ModalProps {
  isOpenModal: boolean;
  setIsOpenModal: () => void;
  children: ReactNode;
  type: 'edit' | 'delete';
}

export function Modal({ isOpenModal, setIsOpenModal, children, type }: ModalProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <Dialog.Root open={isOpenModal} onOpenChange={setIsOpenModal}>
      <Dialog.Trigger
        type='button'
        title="Edit task"
      >
        {type === "edit" ? <PencilSimpleLine size={24} /> : <Trash size={24} />}
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
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}