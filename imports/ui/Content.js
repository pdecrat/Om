import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { Context } from '/imports/ui/ContextTracker'
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
import { throttle } from 'lodash';

import { rem } from '/imports/ui/_lib/helpers-css';
import { hideMenu, showMenu } from '/imports/ui/_state/ui/menu';
import Blocks from '/imports/blocks/blocks-index';
import Data from '/imports/api/Data';

const StyledContent = styled.div`
  padding-top: ${props => rem(props.theme.size.nav)};
  background-color: ${props => props.theme.color.light};
  height: 100vh;
  overflow-y: ${props => props.preventScroll ? "scroll" : "auto" }
`

class Content extends React.Component {

  state = {
    lastScrollTop: 0,
    didScroll: false,
    delta: 20,
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
        && scrollTop - lastScrollTop > delta)
      {
        dispatchHide();
      } else if (isMenuHidden
        && (scrollTop < lastScrollTop
          && lastScrollTop - scrollTop > delta
        || scrollTop < navHeight)
      ) {
        dispatchShow();
      }

      this.setState({
        lastScrollTop: scrollTop
      });
    }
  }, 150)

  render() {
    const {
      layout,
      preventScroll,
      context,
      query,
    } = this.props;
    const Component = Blocks[layout];

    return layout ?
      <StyledContent
        ref="content"
        onScroll={e => {e.persist(); this.handleScroll(e); }}
        preventScroll={preventScroll}
      >
        <Component query={query} context={context} />
      </StyledContent>
      : null;
  }
}

const TrackedContent = withTracker(props => {
  const {
    context,
    query,
    dispatchPush,
  } = props;

  if (!context) return props;
  const view = Data.findOne({
    root: context._id,
    type: 'view',
    name: query.view ? query.view : context.name,
  });
  if (!view) {
    dispatchPush('/not-found')
  }

  return {
    ...props,
    layout: view && view.layout,
    context,
    query,
  }
})(Content);

const TestContent = props => {
  const { context, query } = useContext(Context);
  return <TrackedContent {...props} query={query} context={context} />
}

const mapStateToProps = state => ({
  preventScroll: state.ui.menu.open || state.ui.modal.open,
  isMenuHidden: state.ui.menu.hidden,
})
const mapDispatchToProps = dispatch => ({
  dispatchHide: () => dispatch(hideMenu()),
  dispatchShow: () => dispatch(showMenu()),
  dispatchPush: url => dispatch(replace(url)),
})
export default connect(mapStateToProps, mapDispatchToProps)(TestContent);
