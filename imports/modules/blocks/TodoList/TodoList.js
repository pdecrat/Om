import React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import Blocks from '/imports/core/Blocks';
import Data from '/imports/core/Data';
import ActionButton from '/imports/ui/_components/ActionButton';
import useCall from '/imports/ui/_hooks/useCall';

import TodoItem from './TodoItem';

Blocks.register('TodoList', ({ block }) => {
  const tasks = useTracker(() => Data.find({
    root: block.root,
    type: 'todo',
  }).fetch(), [block.root]);

  return (
    <List
      subheader={

      }
    >
      {tasks.map(task =>
        <TodoItem key={task._id} task={task} />
      )}
    </List>
  )
});
