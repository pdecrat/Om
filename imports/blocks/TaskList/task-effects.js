import SimpleSchema from 'simpl-schema';

import Actions from '/imports/api/Actions';

const addTask = ({ target, data }) => {
  const task = {
    name: data.name,
    type: 'task',
    parentId: target._id,
  }
  Actions.getType('task').insert(task)
}
addTask.dataSchema = new SimpleSchema({
  name: {
    type: String
  }
})

Actions.registerEffect('addTask', addTask);
Actions.add({
  name: 'addTask',
  effects: {
    addTask: true
  }
})

const removeTask = ({ target  }) => {
  Actions.getType('task').remove(target._id);
}
Actions.registerEffect('removeTask', removeTask);
Actions.add({
  name: 'removeTask',
  effects: {
    removeTask: true
  }
})
