import { useRouteMatch} from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';

const useSpace = () => {
  const match = useRouteMatch();
  const reference = encodeURI(match.params.reference);
  const type = match.params.type === 's' ? 'space' : 'user';

  const isReady = useTracker(() => {
    const handle = Meteor.subscribe('context-data', reference);

    return handle.ready();
  }, [reference]);

  const context = useTracker(() => {
    if (isReady) {
      const mongoQuery = Meteor.isServer ?
        { reference, root: type }
        : { reference }
      const context = Data.findOne(mongoQuery);
      return context;
    }

    return {};
  }, [isReady]);

    return { isReady, context };
}

export default useSpace;
