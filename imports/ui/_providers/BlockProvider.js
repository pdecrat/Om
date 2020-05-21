import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';


export const BlockContext = React.createContext({})

const BlockProvider = ({ blockId, children }) => {

  const block = useTracker(() => {
    return Data.findOne({
      _id: blockId,
    });
  }, []);

  return (
    <BlockContext.Provider value={{ block }}>
      {block && children}
    </BlockContext.Provider>
  )

}

export default BlockProvider;
