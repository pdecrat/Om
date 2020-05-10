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
    if (!!action.data)
      data = { ...data, ...action.data };

    Object.keys(action.effects).forEach(effect => {
      this._effects[effect].fn({ origin, target, data });
    });
  },
  validateDataSchema({ action, data = {} }) {
    const keys = Object.keys(action.effects);
    const validationSchema = new SimpleSchema({});
    if (keys.length > 0) {
      keys.forEach(effect => {
        validationSchema.extend(this._effects[effect].dataSchema);
      });
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
