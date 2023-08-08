import * as Collapsible from '@radix-ui/react-collapsible';
import { CaretDown, CaretUp } from 'phosphor-react';
import { useContext, useState } from 'react';
import { TasksContext } from '../../../context/TasksContext';
import { Task } from '../..';

export function Collapse() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { allTasks } = useContext(TasksContext);

  function handleCollapse() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <Collapsible.Root>
      <Collapsible.Trigger>
        <button
          onClick={handleCollapse}
        >
          {isCollapsed ? <CaretUp size={24} weight="bold" /> : <CaretDown size={24} weight="bold" />}
        </button>
      </Collapsible.Trigger>
      <Collapsible.Content className='absolute left-24 top-[70%]'>
        {allTasks.map((task) => (
          <Task
            key={task.id}
            title={task.title}
            id={task.id}
          />
        ))}
      </Collapsible.Content>
    </Collapsible.Root>

  )
}