import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Blocks = new Mongo.Collection('blocks');

if (Meteor.isServer) {
  Meteor.startup(() => {
    if (Blocks.find().count() === 0) {
      Blocks.insert({
        name: 'SpaceCreator',
        category: ''
      })
      Blocks.insert({
        name: 'BlockManager',
        category: 'configuration'
      })
      Blocks.insert({
        name: 'MenuTester',
        category: 'test'
      })
    }
  })
}
