import { Checkbox } from "..";
import { TaskProps } from "../../Task";

interface SubtaskProps extends TaskProps { }

export function Subtask({ innerRef, provided, type, id, title }: SubtaskProps) {
  return (
    <li
      key={id}
      className=""
      ref={innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
    >
      <Checkbox
        checked={false}
        text={title}
        onCheckedChange={() => { }}
      />
    </li>
  )
}