import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

import Data from '/imports/core/Data';

const Actions = {
  _effects: {},
  registerEffect(name, effect) {
    if (!this._effects[name])
      this._effects[name] = effect;
  },
  getEffect(name) {
    if (this._effects[name])
      return this._effects[name];
  },
  do({ action, origin, target, data }) {
    action.effects.forEach(({ name, options }) => {
      this._effects[name].fn({ action, origin, target, data, options });
    });
    if (target) Data.update({ root: target.root, _id: target._id }, target);
    if (origin) Data.update({ root: origin.root, _id: origin._id }, origin);
    if (action) Data.update({ root: action.root, _id: action._id }, action);
  },
  simulate({ origin, target }, effects = []) {
    let targetData = target ? Data.findOne(target) : null;
    let originData = origin ? Data.findOne(origin) : null;

    effects.forEach(({ name, data, options }) => {
      this._effects[name].fn({
        action: {}, origin: originData, target: targetData, data, options });
    });
    if (target) Data.update(target, targetData);
    if (origin) Data.update(origin, originData);
  },
  validateDataSchema({ action, data = {} }) {
    if (action.effects.length > 0) {
      const validationSchema = new SimpleSchema({});

      action.effects.forEach(({ name, options }) => {
        if (this._effects[name].dataSchema)
          validationSchema.extend(this._effects[name].dataSchema(options));
      });
      data = validationSchema.clean(data);
      validationSchema.validate(data);
    }
  }
};

Meteor.methods({
  'do'(action) {
    new SimpleSchema({
      name: {
        type: String
      },
      data: {
        type: Object,
        blackbox: true,
        optional: true,
        defaultValue: {}
      },
      target: {
        type: Object,
        optional: true,
        defaultValue: null
      },
      'target._id': {
        type: String
      },
      'target.root': {
        type: String
      }
    }).validate(action);

    const requestedAction = Data.findOne({
      root: action.target.root,
      type: "action",
      name: action.name
    });
    if (!requestedAction) {
      throw new Meteor.Error(
        'action-method:action-not-found',
        `The requested action doesn't exist`
      );
    }
    if (!!action.target) {
      action.target = Data.findOne(action.target);
      if (!action.target) {
        throw new Meteor.Error(
          'action-method:target-not-found',
          "The object you tried to interact with could not be found"
        )
      }
    }
    action.origin = Meteor.isServer ?
      Meteor.user()
      : Data.findOne({
          type: "header",
          root: Meteor.userId()
        })
    Actions.validateDataSchema({ action: requestedAction, ...action });
    return Actions.do({ action: requestedAction, ...action });
  }
});

export default Actions;

if (Meteor.isClient) {
  window.Actions = Actions;
}
