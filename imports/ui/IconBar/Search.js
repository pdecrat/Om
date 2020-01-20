import React from 'react';
import styled from 'styled-components';
// import { Search as Fsearch } from 'react-feather';

const StyledSearch = styled.li`
  width: 100%;
  display: flex;
  margin: 0 70px;
  padding: 5px 10px;
  justify-content:flex-end;
  border: 1px solid;
  border-radius: 22px;
`

const Search = () =>
  <StyledSearch>
    <Fsearch size={24} />
  </StyledSearch>

export default Search;
