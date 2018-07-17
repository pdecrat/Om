import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Collections = new Mongo.Collection('collections');

if (Meteor.isServer) {
  Meteor.publish('datastore', function() {
    return [
      Collections.find(),
      Collections['spaces'].find()
    ];
  })
  Collections.remove({});
}

Collections.add = (name, collection) => {
  if (!Collections[name]) {
    const handle = Collections.insert({name})
    Collections[name] = collection;

    return handle;
  }
}

export class Collection extends Mongo.Collection {
  constructor(name) {
    const collection = super(name);
    Collections.add(name, collection);
    return collection;
  }
}

Meteor.methods({
  'collections.get'() {
    return Collections.find().fetch();
  }
})
