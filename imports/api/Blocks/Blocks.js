import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Blocks = new Mongo.Collection('blocks');

if (Meteor.isServer) {
  Meteor.startup(() => {
    if (Blocks.find().count() === 0) {
      Blocks.insert({
        name: 'SpaceCreator',
        content: {
          category: '',
        }
      })
      Blocks.insert({
        name: 'BlockManager',
        content: {
          category: 'configuration',
        }
      })
      Blocks.insert({
        name: 'MenuTester',
        content: {
          category: 'test',
        }
      })
    }
  })
}
export default Blocks;
