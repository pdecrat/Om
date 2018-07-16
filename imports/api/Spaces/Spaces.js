import { Meteor } from 'meteor/meteor';

const Spaces = {
  list: [
    {
      name: 'Om',
      blocks: [
        'ModalTester',
        'MenuTester',
      ]
    }
  ]
};

export default Spaces;

Meteor.methods({
  'spaces.get'(name) {
    return Spaces.list.find(space => space.name === name && space)
  }
});
