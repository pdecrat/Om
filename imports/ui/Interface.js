import React from 'react';

import Menu from '/imports/ui/Menu/Menu';
import Content from '/imports/ui/Content';
import Editable from '/imports/ui/_components/Editable';

const Interface = () => {

  return (
    <React.Fragment>
      <Menu />
      <Editable>
        <Content />
      </Editable>
    </React.Fragment>
  )
}

export default Interface;
