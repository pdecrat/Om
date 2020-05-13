import { useContext } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import useQuery from '/imports/ui/_hooks/useQuery';
import { Context } from '/imports/ui/_providers/ContextProvider';

const useView = () => {
  const query = useQuery();
  const { context, isReady } = useContext(Context);

  const view = useTracker(() => {
    const viewQuery = query.view ? { name: query.view } : { isMainView: true };

    return isReady ? Data.findOne({
      root: context._id,
      type: 'view',
      ...viewQuery
    }) : {};
  }, [query.view, isReady]);


  return view;
}

export default useView;
