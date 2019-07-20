import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import Spaces from '/imports/core/Spaces/Spaces';

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
  return Collections.list[name]
}

Collections.add = (name) => {
  Collections.list[name] = new Collection(name);
}

Collections.register = (name, cursor) => {
  Collections.list[name] = cursor;
}
