import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import SubtaskInput2 from "./SubtaskInput2";

export function SortableSubtaskInput(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  let style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <SubtaskInput2
      id={props.id}
      ref={setNodeRef}
      style={style}
      subtask={props.subtask}
      handleChangeSubtask={props.handleChangeSubtask}
      handleRemoveSubtask={props.handleRemoveSubtask}
      attributes={attributes}
      listeners={listeners}
      isDragging={isDragging}
    ></SubtaskInput2>
  );
}
