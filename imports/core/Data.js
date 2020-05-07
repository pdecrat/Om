import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Data = Meteor.isClient ? new Mongo.Collection('data') : {};

if (Meteor.isServer) {
  import { Collections } from '/imports/core/Collections';
  Data.find = (query) => {
    const collection = Collections.get(query.root);
    return !!collection && collection.find(query)
  };
  Data.insert = (doc) => {
    const collection = Collections.get(doc.root);
    return !!collection && collection.insert(doc)
  };
  Data.findOne = (query) => {
    const collection = Collections.get(query.root);
    return !!collection && collection.findOne(query)
  };
  Data.update = (selector, update) => {
    const collection = Collections.get(selector.root);
    return !!collection && collection.update(selector, update);
  };
  Data.remove = (selector) => {
    const collection = Collections.get(selector.root);
    return !!collection && collection.remove(selector);
  };
}

export default Data;

if (Meteor.isClient)
  window.Data = Data;
