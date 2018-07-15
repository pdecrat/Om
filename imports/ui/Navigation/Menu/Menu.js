import React from 'react';
import styled from 'styled-components';

import Burger from './Burger';
import Panel from './Panel';

const StyledMenu = styled.div`
  flex-grow: 0;
`

class Menu extends React.Component {

  state = {
    isMenuOpen: false
  }

  toggleMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  }

  render() {
    const { isMenuOpen } = this.state;
    return (
      <StyledMenu>
        <Panel isOpen={this.state.isMenuOpen} toggleMenu={this.toggleMenu} />
        <Burger toggleMenu={this.toggleMenu} isOpen={this.state.isMenuOpen} />
      </StyledMenu>
    )
  }
}
export default Menu;
