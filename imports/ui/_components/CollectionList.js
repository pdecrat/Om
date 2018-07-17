import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Block from '/imports/ui/Block';

const CollectionList = ({ collections }) =>
  <Block width={2} height={4}>
    {Object.keys(collections).map(key => <p key={key}>{key}</p>)}
  </Block>


const mapStateToProps = state => ({
  collections: state.collections,
});
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
