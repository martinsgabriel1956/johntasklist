import * as Toast from '@radix-ui/react-toast';
import { X } from 'phosphor-react';
import clsx from 'clsx';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';

interface ToastProps {
  title: string;
  description?: string;
  openToast: boolean;
  changeStatusToast: (toastStatus: boolean) => void;
}

export function ToastComponent({ openToast, changeStatusToast, title, description }: ToastProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Toast.Root
        open={openToast}
        onOpenChange={changeStatusToast}
        className={clsx("rounded-lg p-4 grid data-[state=open]:animate-slide-in data-[state=closed]:animate-hide] shadow-lg", {
          "bg-dark-border": theme === "dark",
          "bg-light-border": theme === "light",
        })}
      >
        <div className='flex items-center gap-4'>
          <div className="">
            <Toast.Title
              className={clsx("font-bold leading-normal text-lg", {
                "text-dark-purple": theme === "dark",
                "text-light-text": theme === "light"
              })}
            >
              {title}
            </Toast.Title>
            <Toast.Description
              className={clsx("", {
                "text-dark-text": theme === "dark",
                "text-black": theme === "light"
              })}
            >
              {description ?? ""}
            </Toast.Description>
          </div>
          <Toast.Close
            className={clsx("", {
              "text-white": theme === "dark",
              "text-light-text": theme === "light"
            })}
          >
            <X size={24} weight='bold' />
          </Toast.Close>
        </div>
      </Toast.Root>

      <Toast.Viewport
        className='fixed top-4 left-4 w-[390px] max-w-screen m-0 list-none z-[424525] outline-none '
      />
    </>
  )
}