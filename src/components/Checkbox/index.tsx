import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';

export interface CheckboxProps {
  text: string;
}

export function CheckboxComponent({ text }: CheckboxProps) {
  return (
    <div className="flex gap-4 items-center">
      <Checkbox.Root className="w-6 h-6 rounded-[0.31rem] border-2 border-solid border-darker flex items-center justify-center bg-gradient-to-r from-gradientFrom to-gradientTo">
        <Checkbox.Indicator className="">
          <Check
            size={20}
          />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <span
        className='text-xl text-textDark'
      >
        {text}
      </span>
    </div>
  )
}