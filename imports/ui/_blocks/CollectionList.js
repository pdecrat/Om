import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Block from '/imports/ui/_components/Block';

const CollectionList = ({ collections }) =>
  <Block width={1} height={4}>
    <h2>Collection List</h2>
    {Object.keys(collections).map(key => <p key={key}>{key}</p>)}
  </Block>


const mapStateToProps = state => ({
  collections: state.collections,
});
const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
