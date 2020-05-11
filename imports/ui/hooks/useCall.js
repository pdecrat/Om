import { useContext } from 'react';
import { Context } from '/imports/ui/ContextTracker';

const useCall = () => {
  const { context } = useContext(Context);

  const call = ({ name, target, data }, callback) => {
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
    const options = {
      returnStubValue: true,
      throwStubxceptions: true
    };
    Meteor.apply('do', [{ name, target, data }], options, callback);
  };

  return call;
}

export default useCall;
