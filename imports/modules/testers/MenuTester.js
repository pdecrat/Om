import React, { useContext } from 'react';
import styled from 'styled-components';

import Block from '/imports/ui/_components/Block';
import { InterfaceContext } from '/imports/ui/Interface';

const MenuTester = ({ dispatchOpenMenu }) => {
  const { openMenu } = useContext(InterfaceContext);

  return (
    <Block width={1} height={1}>
      <button onClick={e => { openMenu(true) }}>
        Open Menu
      </button>
    </Block>
  )
}

export default MenuTester;
