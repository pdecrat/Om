import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import Data from '/imports/api/Data';
import { rem } from '/imports/ui/_lib/helpers-css';
import Block from '/imports/ui/_components/Block';

const StyledDataList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${rem('15px')};
`

const DataList = ({ data }) =>
  <Block width={2} height={4}>
    <StyledDataList>
      <h2>
        Data List
      </h2>
      <ul>
        {data.map(doc =>
          <li key={doc._id}>
            {doc.name} : {doc.type}
          </li>
        )}
      </ul>
    </StyledDataList>
  </Block>

export default withTracker(props => {
  const data = Data.find({
  }).fetch();
  return {
    ...props,
    data,
  }
})(DataList);
