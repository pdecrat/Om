import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';

import Blocks from '/imports/core/Blocks';
import UserMenu from '/imports/ui/AppBar/UserMenu/UserMenu';
import SpaceMenu from '/imports/ui/AppBar/SpaceMenu/SpaceMenu';
import { UIContext } from '/imports/ui/_providers/UIProvider';
import { ViewContext } from '/imports/ui/_providers/ViewProvider';
import { Context } from '/imports/ui/_providers/ContextProvider';
import FlexSpacer from '/imports/ui/_components/FlexSpacer';
import useDelayedUnmounting from '/imports/ui/_hooks/useDelayedUnmounting';

const defaultMenu = {
  name: 'DefaultMenu',
  size: '48px',
};

const editMenu = {
  name: 'EditMenu',
  size: '96px',
};

const AppBar = () => {
  const [state, show, hide] = useDelayedUnmounting();
  const { isEdited } = useContext(UIContext);
  const { context } = useContext(Context);
  const { view } = useContext(ViewContext);
  const [ currentMenu, setCurrentMenu ] = useState(defaultMenu);
  const Component = Blocks.get(currentMenu.name);

  useEffect(() => {
    hide();
    if (isEdited) {
      setCurrentMenu(editMenu);
    } else if (view.menu) {
      setCurrentMenu(view.menu);
    } else if (context.menu) {
      setCurrentMenu(context.menu);
    } else {
      setCurrentMenu(defaultMenu);
    }
  }, [context.menu, view.menu, isEdited]);
  useEffect(() => {
    if (state === 'unmounted') {
      show()
    }
  }, [currentMenu, state])

  return (
    <React.Fragment>
      {Component && state !== 'unmounted' && <Component />}
      <FlexSpacer maxSize={currentMenu.size} isOpen={state !== 'unmounted'} />
    </React.Fragment>
  )
}

export default AppBar;
