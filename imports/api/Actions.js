import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

import { Collections } from '/imports/api/Collections';

const Actions = {};

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

  Collections.get(origin.type).update(origin._id, origin);
  if (!!target) {
    Collections.get(target.type).update(target._id, target);
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
      'target.parent': {
        type: String
      }
    }).validate(action);

    const requestedAction = Collections.get(action.target.parent).findOne({
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
      action.target = Collections.get(action.target.parent).findOne(action.target._id);
      if (!action.target) {
        throw new Meteor.Error(
          'action-method:target-not-found',
          "The object you tried to interact with could not be found"
        )
      }
    }
    action.origin = Meteor.user() || {};
    Actions.validateDataSchema({ action: requestedAction, ...action });
    return Actions.do({ action: requestedAction, ...action });
  }
});

export function callAction(name, target = null, data = {}, toDispatch = null) {
  const args = {
    target: target ? {
      _id: target._id,
      parent: target.parent,
    } : target,
    data,
    name,
  }
  const options = {
    returnStubValue: true,
    throwStubxceptions: true
  };

  return dispatch => {
    Meteor.apply('do', [args], options, (err, res = {}) => {
      if (err) {
        // handle error
      } else if (!!toDispatch) {
        toDispatch(dispatch, res, data);
      }
    })
  }
}


export default Actions;


if (Meteor.isClient) {
  window.Actions = Actions;
}
