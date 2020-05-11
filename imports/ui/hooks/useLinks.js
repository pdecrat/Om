import { useTracker } from 'meteor/react-meteor-data';
import { useContext } from 'react';

import { Context } from '/imports/ui/ContextTracker';

const useLinks = () => {
  const { context } = useContext(Context);
  const links = useTracker(() => {
    if (context && context._id) {
      const views = Data.find({
        root: context._id,
        type: "view",
      }).fetch();

      return views;
    }
    return [];
  });

  return links;
}

export default useLinks;
