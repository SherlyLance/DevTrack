import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const KanbanCard = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 rounded-md shadow-sm border border-gray-200"
        >
          <h4 className="text-md font-medium text-gray-800 mb-2">{task.content}</h4>
          {/* Add more task details here */}
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;
