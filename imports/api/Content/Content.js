import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

class ContentCollection extends Mongo.Collection {
  insert(doc, callback) {
    doc.createdAt = Date.now();

    return super.insert(doc, callback);
  }
}

const Content = new ContentCollection('content');

export default Content;

if (Meteor.isServer) {
  // Content.remove({});
}
