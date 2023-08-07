import { useContext, useState } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import clsx from 'clsx';
import { TasksContext } from '../../../context/TasksContext';

export interface CheckboxProps {
  text: string;
}

export function CheckboxComponent({ text }: CheckboxProps) {
  const [checked, setChecked] = useState(false);
  const { completeTask, allTasks, uncheckCompletedTask } = useContext(TasksContext);

  function handleChecked() {
    const task = allTasks.find(task => task.title === text);
    setChecked(!checked);

    if (!checked) {
      completeTask(task!.id);

    } else {
      uncheckCompletedTask(task!.id);
    }
  }

  return (
    <div className="flex gap-4 items-center group">
      <Checkbox.Root
        className="w-6 h-6 rounded-[0.31rem] border-2 border-solid border-darker flex items-center justify-center bg-gradient-to-r from-gradientFrom to-gradientTo"
        onCheckedChange={handleChecked}
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