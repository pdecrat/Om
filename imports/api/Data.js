import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


const Data = Meteor.isClient ? new Mongo.Collection('data') : {};

Data.subscribe = (name, params, callback) => {
  if (Meteor.isClient) {
    Meteor.subscribe(name, params,callback);
  }
}

if (Meteor.isServer) {
  import { Collections } from '/imports/api/Collections';
  Data.find = (query) => {
    return Collections.get(query.root).find(query)
  };
  Data.findOne = (query) => {
    return Collections.get(query.root).findOne(query)
  };
}

export default Data;

if (Meteor.isClient)
  window.Data = Data;
