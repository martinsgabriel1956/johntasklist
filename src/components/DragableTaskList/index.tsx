import { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Task } from "..";
import { TasksContext } from "../../context/TasksContext";

export function DraggableTaskList() {
  const { allTasks, updateTaskList } = useContext(TasksContext);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(allTasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateTaskList(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <ul
            className="h-96 overflow-auto pr-4 scrollbar-thin scrollbar-track-zin-950 scrollbar-thumb-zinc-800"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {allTasks ? allTasks.map((todo, index) => (
              <Draggable
                key={todo.id}
                draggableId={todo.id}
                index={index}
              >
                {(provided) => (
                  <Task
                    id={todo.id}
                    title={todo.title}
                    innerRef={provided.innerRef}
                    provided={provided}
                  />
                )}
              </Draggable>
            )) : <></>}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext >
  );
}