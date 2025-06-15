import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ column }) => {
  return (
    <div className="flex flex-col w-80 bg-gray-200 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold px-4 py-3 bg-gray-300 rounded-t-lg">{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex-1 p-4 space-y-3 overflow-y-auto"
          >
            {column.tasks.map((task, index) => (
              <KanbanCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
