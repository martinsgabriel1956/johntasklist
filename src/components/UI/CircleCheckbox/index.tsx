import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import clsx from 'clsx';
import { CheckboxProps } from '../Checkbox';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';

interface CircleCheckboxProps extends CheckboxProps {
  defaultChecked: boolean;
}

export function CircleCheckbox({ checked, text, onCheckedChange, defaultChecked }: CircleCheckboxProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex gap-4 items-center group">
      <Checkbox.Root
        className={clsx("w-6 h-6 rounded-full border-2 border-solid flex items-center justify-center bg-gradient-to-r  ", {
          "border-dark-checkboxBorder": theme === "dark",
          "border-dark-text": theme === "light",
          "from-dark-gradientFrom": theme === "dark",
          "to-dark-gradientTo": theme === "dark",
          "from-light-gradientFrom": theme === "light",
          "to-light-gradientTo": theme === "light",
        })}
        onCheckedChange={onCheckedChange}
        checked={checked}
        defaultChecked={defaultChecked}
      >
        <Checkbox.Indicator>
          <Check
            size={18}
            weight='bold'
            className={clsx('', {
              "text-dark-text": theme === "dark",
              "text-light-text": theme === "light"
            })}
          />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <span
        className={clsx('text-xl', {
          "text-taskHover": checked,
          "text-dark-text": theme === "dark",
          "text-light-text": theme === "light"
        })}
      >
        {checked ? <s>{text}</s> : text}
      </span>
    </div>
  );
}