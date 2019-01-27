import React from 'react';

import ContextTracker from '/imports/ui/ContextTracker';
import Modal from '/imports/ui/Modal/Modal';
import Content from '/imports/ui/Content';
import '/imports/ui/_lib/global-style';

const Interface = () =>
  <React.Fragment>
    <Modal />
    <ContextTracker />
    <Content />
  </React.Fragment>

export default Interface
