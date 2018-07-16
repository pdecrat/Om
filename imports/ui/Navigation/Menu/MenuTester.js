import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { openMenu } from '/imports/state/app/menu';
import ContentBlock from '/imports/ui/Content/ContentBlock';

const MenuTester = ({ dispatchOpenMenu }) =>
  <ContentBlock width={1} height={1} >
    <button onClick={e => { dispatchOpenMenu() }}>
      Open Menu
    </button>
  </ContentBlock>


const mapStateToProps = state => ({ menu: state.app.menu });
const mapDispatchToProps = dispatch => ({
  dispatchOpenMenu: () => dispatch(openMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuTester);
