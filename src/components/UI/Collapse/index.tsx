import * as Collapsible from '@radix-ui/react-collapsible';
import { CaretDown, CaretUp } from 'phosphor-react';
import { useState } from 'react';
import { DraggableSubtaskList } from '../../DraggableSubtaskList';

export function Collapse() {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      <Collapsible.Content className='absolute top-12 left-20'>
        <DraggableSubtaskList />
      </Collapsible.Content>
    </Collapsible.Root>

  )
}