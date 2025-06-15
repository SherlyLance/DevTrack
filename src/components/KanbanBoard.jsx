import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = () => {
  const columns = {
    'to-do': {
      id: 'to-do',
      title: 'To Do',
      tasks: [
        { id: 'task-1', content: 'Set up project structure' },
        { id: 'task-2', content: 'Implement user authentication' },
      ],
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        { id: 'task-3', content: 'Design database schema' },
      ],
    },
    'done': {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: 'task-4', content: 'Initial project planning' },
      ],
    },
  };

  const onDragEnd = (result) => {
    // TODO: Implement drag and drop logic to update state and API
    console.log(result);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 p-4">
        {Object.values(columns).map((column) => (
          <KanbanColumn key={column.id} column={column} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
