import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Block from '/imports/ui/_components/Block';
import Select from '/imports/ui/_components/Select';

const StyledBlockManager = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`

class BlockManager extends React.Component {
  render() {
    return (
      <Block width={3} height={4}>
        <StyledBlockManager>
          <Select />
          <Select />
        </StyledBlockManager>
      </Block>
    )
  }
}

const mapDispatchToProps = dispatch => ({
});

export default connect(null, mapDispatchToProps)(BlockManager);
