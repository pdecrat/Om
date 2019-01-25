import React from 'react';

import TargetTracker from '/imports/ui/TargetTracker';
import Modal from '/imports/ui/Modal/Modal';
import Content from '/imports/ui/Content';
import '/imports/ui/_lib/global-style';

const Interface = () =>
  <div>
    <TargetTracker />
    <Content />
    <Modal />
  </div>

export default Interface
