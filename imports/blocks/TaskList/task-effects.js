import SimpleSchema from 'simpl-schema';

import Actions from '/imports/api/Actions';
import Collections from '/imports/api/Collections';

const addTask = ({ target, data }) => {
  const task = {
    name: data.name,
    type: 'task',
    parentId: target._id,
  }
  Collections.get('task').insert(task)
}
addTask.dataSchema = new SimpleSchema({
  name: {
    type: String
  }
})

Actions.registerEffect('addTask', addTask);

const removeTask = ({ target  }) => {
  Collections.get('task').remove(target._id);
}
Actions.registerEffect('removeTask', removeTask);
