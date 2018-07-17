import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Block from '/imports/ui/_components/Block';

const CollectionTester = ({ collections }) =>
  <Block width={2} height={2}>
    <input />
  </Block>


const mapStateToProps = state => ({
  collections: state.collections,
});
const mapDispatchToProps = dispatch => ({
  dispatchRequestData: request => dispatch(requestData(request))
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionTester);
