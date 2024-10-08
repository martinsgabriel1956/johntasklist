import { useCallback, useContext, useState } from "react";
import { TasksContext } from "../../context/TasksContext";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { Subtask } from "../UI/Subtask";

export function DraggableSubtaskList() {
  const { allTasks, updateSubtaskList } = useContext(TasksContext);
  const [taskId, setTaskId] = useState("");

  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;
    const allSubtask = allTasks.map(task => task.subtasks!);
    const items = Array.from(allSubtask);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateSubtaskList(items.flat(), taskId);
  }, [allTasks, updateSubtaskList, taskId]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="subtasks">
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {allTasks.map((task) => {
              return task.subtasks?.map((subtask, index) => (
                <Draggable
                  key={subtask.id}
                  draggableId={subtask.id}
                  index={index}
                >
                  {(provided) => {
                    setTaskId(task.id);
                    return (
                      <Subtask
                        id={subtask.id}
                        taskId={task.id}
                        title={subtask.title}
                        innerRef={provided.innerRef}
                        provided={provided}
                      />
                    )
                  }}
                </Draggable>
              ))
            })}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}