import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import clsx from 'clsx';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';

export interface CheckboxProps {
  text: string;
  onCheckedChange: (checked: boolean) => void;
  checked: boolean;
}

export function CheckboxComponent({ text, onCheckedChange, checked }: CheckboxProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex gap-4 items-center group">
      <Checkbox.Root
        className={clsx("w-6 h-6 rounded-[0.31rem] border-2 border-solid flex items-center justify-center bg-gradient-to-r ", {
          "border-dark-checkboxBorder": theme === "dark",
          "border-dark-text": theme === "light",
          "from-dark-gradientFrom": theme === "dark",
          "to-dark-gradientTo": theme === "dark",
          "from-light-gradientFrom": theme === "light",
          "to-light-gradientTo": theme === "light",
        })}
        onCheckedChange={onCheckedChange}
        checked={checked}
      >
        <Checkbox.Indicator>
          <Check
            size={18}
            weight='bold'
            className={clsx("", {
              "text-dark-text": theme === "dark",
              "text-light-text": theme === "light",
            })}
          />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <span
        className={clsx('text-xl ', {
          "text-taskHover": checked,
          "text-dark-text": theme === "dark",
          "text-light-text": theme === "light"
        })}
      >
        {checked ? <s>{text}</s> : text}
      </span>
    </div>
  )
}