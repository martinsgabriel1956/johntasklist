import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import clsx from 'clsx';

export interface CheckboxProps {
  text: string;
  onCheckedChange: (checked: boolean) => void;
  checked: boolean;
}

export function CheckboxComponent({ text, onCheckedChange, checked }: CheckboxProps) {
  return (
    <div className="flex gap-4 items-center group">
      <Checkbox.Root
        className="w-6 h-6 rounded-[0.31rem] border-2 border-solid border-darker flex items-center justify-center bg-gradient-to-r from-gradientFrom to-gradientTo"
        onCheckedChange={onCheckedChange}
        checked={checked}
      >
        <Checkbox.Indicator>
          <Check
            size={18}
            weight='bold'
          />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <span
        className={clsx('text-xl text-textDark', {
          "text-taskHover": checked
        })}
      >
        {checked ? <s>{text}</s> : text}
      </span>
    </div>
  )
}