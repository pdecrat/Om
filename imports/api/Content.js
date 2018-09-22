import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Content = new Mongo.Collection('content');

export default Content;

window.Content = Content;
