import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { openMenu } from '/imports/state/redux/ui/menu';
import Block from '/imports/ui/Block';

const MenuTester = ({ dispatchOpenMenu }) =>
  <Block width={1} height={1} >
    <button onClick={e => { dispatchOpenMenu() }}>
      Open Menu
    </button>
  </Block>


const mapStateToProps = state => ({ menu: state.ui.menu });
const mapDispatchToProps = dispatch => ({
  dispatchOpenMenu: () => dispatch(openMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuTester);
