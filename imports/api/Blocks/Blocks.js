import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Blocks = new Mongo.Collection('blocks');

if (Meteor.isServer) {
  Meteor.startup(() => {
    Blocks.remove({})
    if (Blocks.find().count() === 0) {
      Blocks.insert({
        name: 'SpaceCreator',
        content: {
          category: '',
        },
        type: 'blockTemplate'
      })
      Blocks.insert({
        name: 'BlockManager',
        content: {
          category: 'configuration',
        },
        type: 'blockTemplate'
      })
      Blocks.insert({
        name: 'MenuTester',
        content: {
          category: 'test',
        },
        type: 'blockTemplate'
      })
      Blocks.insert({
        name: 'TaskList',
        content: {
          category: '',
        },
        type: 'blockTemplate'
      })
    }
  })
}
export default Blocks;
