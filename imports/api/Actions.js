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

  if (!!action.data)
    data = { ...data, ...action.data };

  Object.keys(action.effects).forEach(effect => {
    Actions._effects[effect]({ origin, target, data, response });
  });

  if (!!origin) {
    Collections.get(origin.root).update(origin._id, origin);
  }
  if (!!target) {
    Collections.get(target.root).update(target._id, target);
  }
  return response;
}

Actions.validateDataSchema = ({ action, data }) => {
  const keys = Object.keys(action.effects);
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
      'target.root': {
        type: String
      }
    }).validate(action);

    const requestedAction = Collections.get(action.target.root).findOne({
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
      action.target = Collections.get(action.target.root).findOne(action.target._id);
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

export function callAction(name, target = null, data = {}, toDispatch = null) {
  const args = {
    target: target ? {
      _id: target._id,
      root: target.root,
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
        console.log(err)
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
