import React from 'react';
import styled from 'styled-components';
import { withRouter} from 'react-router-dom';

import { rem } from '/imports/ui/_lib/helpers-css';
import Text from '/imports/ui/_components/Text';

const StyledParagraph = styled.div`
  padding: ${rem('15px')};
  max-width: ${rem('740px')};
  margin: auto;
`

const Paragraph = ({ data, history }) =>
  <StyledParagraph onClick={e => {
    history.push(`${history.location.pathname}?focus=${data._id}`)
  }}>
    <Text text={data.text} />
  </StyledParagraph>

export default withRouter(Paragraph);
