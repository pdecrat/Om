import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import Spaces from '/imports/api/Spaces/Spaces';

if (Meteor.isClient) {
  import Data from '/imports/api/Data';
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
  list: {
  }
};

Collections.get = name => {
  if (Meteor.isClient) return Data;
  return Collections.list[name]
}

Collections.add = (name) => {
  if (Meteor.isServer) {
    Collections.list[name] = new Collection(name);
  }
}

Collections.register = (name, cursor) => {
  if (Meteor.isServer)
    Collections.list[name] = cursor;
}
