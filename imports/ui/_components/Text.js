import React from 'react';
import styled from 'styled-components';

import { rem } from '/imports/ui/_lib/helpers-css';

const defaultString = "Fieri nosse fieri convivia si adhibetur vicissitudo vicissitudo excubat adhibetur commodis consilio confingit peregrinum plene aut invitari qui conveniet quaedam domibus quibus sollemnium tractatur sportularum noxia consilio vicissitudo sportularum aurigarum consilio aut quaedam quaedam commodis tesserariam autem se se aurigarum autem id anxia et placuerit id convivia tractatur is quibus adhibetur distributio convivia pro aurigarum tesserariam his profitetur artem autem nosse qui aut confingit nosse profitetur convivia aut convivia et digesto aurigarum aut anxia exceptis tesserariam excubat aut et quibus deliberatione tractatur distributio distributio.";

const StyledText = styled.p`
  font-weight: 400;
  font-style: normal;
  font-size: ${rem("21px")};
  line-height: 1.58;
`

const Text = ({ text = defaultString }) =>
  <StyledText>
    {text}
  </StyledText>

export default Text;
