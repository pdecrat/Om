import React from 'react';
import styled from 'styled-components';

import { rem } from '/imports/ui/_lib/helpers-css';
import Text from '/imports/ui/_components/Text';

const StyledParagraph = styled.div`
  padding: ${rem('15px')};
  max-width: ${rem('740px')};
  margin: auto;
`

const Paragraph = ({ data = {} }) =>
  <StyledParagraph>
    <Text text={data.text} />
  </StyledParagraph>

export default Paragraph;
