import React from 'react';

import '/imports/ui/_lib/global-style';
import Content from '/imports/ui/Content/Content';
import Navigation from '/imports/ui/Navigation/Navigation';
import Modal from '/imports/ui/Modal/Modal';

const Interface = () =>
  <div>
    <Navigation />
    <Content />
    <Modal />
  </div>

export default Interface;
