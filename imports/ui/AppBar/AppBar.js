import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import { SwitchTransition, Transition } from "react-transition-group";

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

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

const setMenu = () => {

}

const AppBar = () => {
  const { isEdited } = useContext(UIContext);
  const { context } = useContext(Context);
  const { view } = useContext(ViewContext);
  const getMenu = () => {
    if (isEdited) {
      return editMenu;
    } else {
      return {
        ...defaultMenu,
        ...context.menu,
        ...view.menu
      }
    }

  }

  const [ currentMenu, setCurrentMenu ] = useState(getMenu());
  const Component = currentMenu && Blocks.get(currentMenu.name);

  useEffect(() => {
    setCurrentMenu(getMenu());
  }, [context.menu, view.menu, isEdited]);

  return currentMenu ? (
    <React.Fragment>
      <SwitchTransition>
        <Transition key={currentMenu.name} timeout={160}>
          {state => (
            <div style={{
              transition: `opacity ${160}ms ease-in-out`,
              ...transitionStyles[state]
            }}>
              <Component />
            </div>
          )}
        </Transition>
      </SwitchTransition>
      <FlexSpacer maxSize={currentMenu.size} isOpen={true} />
    </React.Fragment>
  ) : null;
}

export default AppBar;
