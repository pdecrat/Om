import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Blocks from '/imports/core/Blocks';
import Data from '/imports/core/Data';
import useView from '/imports/ui/hooks/useView';
import useBlocks from '/imports/ui/hooks/useBlocks';

const Content = () => {
  const history = useHistory()
  const view = useView();

  if (!view && (Meteor.isServer || isReady)) {
    history.replace('/not-found')
    return null;
  }
  const blocks = useBlocks();

  return (
    <React.Fragment>
      <div style={{ height: '48px' }} />
      {blocks.map((block, index) => {
        const Component = Blocks.get(block.name);
        return !!Component && <Component key={index} block={block} />
      })}
    </React.Fragment>
  );
}

export default Content;
