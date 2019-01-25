import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
import { throttle } from 'lodash';

import { rem } from '/imports/ui/_lib/helpers-css';
import { hideMenu, showMenu } from '/imports/ui/_state/ui/menu';
import Blocks from '/imports/blocks/blocks-index';
import Data from '/imports/api/Data';

const StyledContent = styled.div`
  padding-top: ${rem('50px')};
  background-color: white;
  height: 100vh;
  overflow-y: ${props => props.preventScroll ? "scroll" : "auto" }
`

class Content extends React.Component {

  state = {
    lastScrollTop: 0,
    didScroll: false,
    delta: 5,
    navHeight: 50,
  }

  componentWillUpdate() {
    const content = ReactDOM.findDOMNode(this.refs.content);

    if (this.props.layout && this.props.isMenuHidden && content.scrollTop === 0) {
      this.props.dispatchShow();
    }
  }


  handleScroll = throttle((e) => {
    const content = ReactDOM.findDOMNode(this.refs.content);
    if (e.target === content) {
      const {
        lastScrollTop,
        didScroll,
        delta,
        navHeight
      } = this.state;
      const {
        dispatchShow,
        dispatchHide,
        isMenuHidden,
      } = this.props;
      const scrollTop = content.scrollTop;

      if (Math.abs(lastScrollTop - scrollTop) <= delta)
        return;

      if (!isMenuHidden
        && scrollTop > lastScrollTop
        && scrollTop > navHeight
        && scrollTop - lastScrollTop > navHeight)
      {
        dispatchHide();
      } else if (isMenuHidden
        && (scrollTop < lastScrollTop
          && lastScrollTop - scrollTop > navHeight
        || scrollTop < navHeight)
      ) {
        dispatchShow();
      }

      this.setState({
        lastScrollTop: scrollTop
      });
    }
  }, 250)

  render() {
    const {
      layout,
      preventScroll
    } = this.props;
    const Component = Blocks[layout];

    return layout ?
      <StyledContent
        ref="content"
        onScroll={e => {e.persist(); this.handleScroll(e); }}
        preventScroll={preventScroll}
      >
        <Component />
      </StyledContent>
      : null;
  }
}

const TrackedContent = withTracker(props => {
  const {
    target,
    hash,
  } = props;

  if (!target) return props;
  const view = Data.findOne({
    type: 'view',
    name: hash.length ? hash : target.name,
  });

  return {
    ...props,
    layout: view && view.layout,
  }
})(Content);

const mapStateToProps = state => ({
  preventScroll: state.ui.menu.open || state.ui.modal.open,
  isMenuHidden: state.ui.menu.hidden,
  target: state.target.doc,
  hash: state.target.hash
})
const mapDispatchToProps = dispatch => ({
  dispatchHide: () => dispatch(hideMenu()),
  dispatchShow: () => dispatch(showMenu()),
})
export default connect(mapStateToProps, mapDispatchToProps)(TrackedContent);
