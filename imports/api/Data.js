import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Data = Meteor.isClient ? new Mongo.Collection('data') : {};

if (Meteor.isServer) {
  import { Collections } from '/imports/api/Collections';
  Data.find = (query) => {
    return !!Collections.get(query.root) && Collections.get(query.root).find({
      isPublic: true,
      isActive: true,
      ...query
    })
  };
  Data.findOne = (query) => {
    return !!Collections.get(query.root) && Collections.get(query.root).findOne({
      isPublic: true,
      isActive: true,
      ...query
    })
  };
}

export default Data;

if (Meteor.isClient)
  window.Data = Data;
