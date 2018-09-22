import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

if (Meteor.isClient) {
  import Content from '/imports/api/Content';
}

export class Collection extends Mongo.Collection {
  insert(doc, callback) {
    if (!doc._id)
      doc._id = new Mongo.ObjectID()._str;
    doc.dateCreated = Date.now();

    return super.insert(doc, callback);
  }
}

export const Collections = {
  list: {}
};

Collections.get = name => {
  if (Meteor.isClient) return Content;
  return Collections.list[name]
}

Collections.add = (name) => {
  if (Meteor.isServer) {
    Collections.list[name] = new Collection(name);
  }
}
