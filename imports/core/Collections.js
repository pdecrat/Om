import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import Spaces from '/imports/core/Spaces/Spaces';

export class Collection extends Mongo.Collection {
  insert(doc, callback) {
    if (!doc._id)
      doc._id = new Mongo.ObjectID()._str;
    if (!doc.label)
      doc.label = doc.name ? doc.name : doc._id;

    return super.insert({
      isActive: doc.isActive ? doc.isActive : true,
      isPublic: doc.isPublic ? doc.isPublic : true,
      dateCreated: Date.now(),
      ...doc
    }, callback);
  }
}

export const Collections = {
  _list: {
  },
  get(name) {
    return this._list[name]
  },
  add(name) {
    this._list[name] = new Collection(name);
  },
  register(name, cursor) {
    this._list[name] = cursor;
  }
};
