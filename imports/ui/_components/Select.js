import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledOption = styled.option`

`

const Select = () =>
  <StyledSelect>
    <StyledOption>
      Lala
    </StyledOption>
    <StyledOption>
      Lala
    </StyledOption>
    <StyledOption>
      Lala
    </StyledOption>
    <StyledOption>
      Lala
    </StyledOption>
  </StyledSelect>

export default Select;
