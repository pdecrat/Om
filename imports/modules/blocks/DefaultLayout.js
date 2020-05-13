import React from 'react';

import Blocks from '/imports/core/Blocks';

import Menu from '/imports/ui/Menu/Menu';
import Content from '/imports/ui/Content';
import Editable from '/imports/ui/_components/Editable';

Blocks.register('DefaultLayout', () => {
  return (
    <React.Fragment>
      <Menu />
      <Editable>
        <Content />
      </Editable>
    </React.Fragment>
  );
});
