import React from 'react';
import styled from 'styled-components';
import { withTracker } from 'meteor/react-meteor-data';

import Data from '/imports/api/Data';
import { rem } from '/imports/ui/_lib/helpers-css';
import withContext from '/imports/ui/_components/hoc/withContext';

const StyledDataList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${rem('15px')};
`

const DataList = ({ data }) =>
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

export default withContext(withTracker(props => {
  const data = Data.find({
    root: props.context._id
  }).fetch();
  return {
    ...props,
    data,
  }
})(DataList));