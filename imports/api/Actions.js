import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

import Blocks from '/imports/api/Blocks/Blocks';
import Content from '/imports/api/Content/Content';
import Spaces from '/imports/api/Spaces/Spaces';
import Users from '/imports/api/Users/Users';

const Actions = new Mongo.Collection('actions');

Actions.add = (action) => Meteor.isServer ? Actions.insert(action) : null;

Actions.getType = type => {
  switch (type) {
    case 'user':
      return Users;
    case 'space':
      return Spaces;
    case 'block':
      return Blocks;
    case 'action':
      return Actions;
    default:
      return Content;
  }
}

Actions._effects = {};
Actions.registerEffect = (name, effect) => {
  if (!Actions._effects[name])
    Actions._effects[name] = effect;
}

Actions.do = ({ action, origin, target, data }) => {
  const response = {};
  let effects = action.effects;
  const targetEffects = !!target && !!target.actions && !!target.actions[action.name] && target.actions[action.name].effects || {};
  const originEffects = !!origin.actions && !!origin.actions[action.name] && origin.actions[action.name].effects || {};

  if (!!action.data)
    data = { ...data, ...action.data };
  if (!!targetEffects)
    effects = { ...effects, ...targetEffects };
    Object.keys(targetEffects).forEach(effect => {
      if (typeof(targetEffects[effect]) !== 'boolean')
        data = { ...data, ...targetEffects[effect] }
    })
  if (!!originEffects)
    effects = { ...effects, ...originEffects };
    Object.keys(originEffects).forEach(effect => {
      if (typeof(originEffects[effect]) !== 'boolean')
        data = { ...data, ...originEffects[effect] }
    })

  Object.keys(effects).forEach(effect => {
    Actions._effects[effect]({ origin, target, data, response });
  });

  Actions.getType(origin.type).update(origin._id, origin);
  if (!!target) {
    Actions.getType(target.type).update(target._id, target);
  }
  return response;
}

Actions.validateDataSchema = ({ action, origin, target, data }) => {
  let effects = action.effects;
  const targetAction = !!target && target.actions && target.actions[action.name];
  const originAction = origin.actions && origin.actions[action.name];

  if (targetAction)
    effects = { ...effects, ...targetAction.effects };
  if (originAction)
    effects = { ...effects, ...originAction.effects };

  const keys = Object.keys(effects);
  const validationSchema = new SimpleSchema({});
  if (keys.length > 0) {
    keys.forEach(effect => {
      validationSchema.extend(Actions._effects[effect].dataSchema);
    });
  }
  validationSchema.validate(data);
}

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
      'target.type': {
        type: String
      }
    }).validate(action);

    const requestedAction = Actions.findOne({ name: action.name });
    if (!requestedAction) {
      throw new Meteor.Error(
        'action-method:action-not-found',
        `The requested action doesn't exist`
      );
    }
    if (!!action.target) {
      action.target = Actions.getType(action.target.type).findOne(action.target._id);
      if (!action.target) {
        throw new Meteor.Error(
          'action-method:target-not-found',
          "The object you tried to interact with could not be found"
        )
      }
    }
    action.origin = Meteor.user();
    Actions.validateDataSchema({ action: requestedAction, ...action });
    return Actions.do({ action: requestedAction, ...action });
  }
});

export default Actions;
