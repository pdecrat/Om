import { useContext } from 'react';
import { Context } from '/imports/ui/_providers/ContextProvider';

const useCall = (name, defaultData, target) => {
  const { context } = useContext(Context);
  const options = {
    returnStubValue: true,
    throwStubxceptions: true
  };

  if (!target) {
    target = {
      _id: context._id,
      root: context.root,
    };
  } else {
    target = {
      _id: target._id,
      root: target.root,
    };
  }

  const call = (data, callback = null, targetOverride = null) => {
    Meteor.apply('do', [{
      name,
      target: targetOverride ? targetOverride : target,
      data: { ...defaultData, ...data }
    }], options, callback);
  };

  return call;
}

export default useCall;
