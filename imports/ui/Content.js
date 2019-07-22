import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
import { throttle } from 'lodash';

import { rem } from '/imports/ui/_lib/helpers-css';
import Blocks from '/imports/modules/blocks-index';
import Data from '/imports/core/Data';
import { Context } from '/imports/ui/ContextTracker';
import { InterfaceContext } from '/imports/ui/Interface';

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

    if (this.props.layout && this.props.isNavHidden && content.scrollTop === 0) {
      this.props.hideNav(false);
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
        hideNav,
        isNavHidden,
      } = this.props;
      const scrollTop = content.scrollTop;

      if (Math.abs(lastScrollTop - scrollTop) <= delta)
        return;

      if (!isNavHidden
        && scrollTop > lastScrollTop
        && scrollTop > navHeight
        && scrollTop - lastScrollTop > delta)
      {
        hideNav(false);
      } else if (isNavHidden
        && (scrollTop < lastScrollTop
          && lastScrollTop - scrollTop > delta
        || scrollTop < navHeight)
      ) {
        hideNav(true);
      }

      this.setState({
        lastScrollTop: scrollTop
      });
    }
  }, 150)

  render() {
    const {
      layout,
      isMenuOpen,
      context,
      query,
    } = this.props;
    const Component = Blocks[layout];

    return layout ?
      <StyledContent
        ref="content"
        onScroll={e => {e.persist(); this.handleScroll(e); }}
        preventScroll={isMenuOpen}
      >
        <Component context={context} query={query} />
      </StyledContent>
      : null;
  }
}

const TrackedContent = withRouter(withTracker(props => {
  const {
    context,
    query,
    history,
    isReady,
  } = props;

  if (!context) return props;

  if (query.focus) {
    return {
      ...props,
      layout: "FullScreen",
    }
  }
  const view = Data.findOne({
    root: context._id,
    type: 'view',
    name: query.view ? query.view : context.name,
  });

  console.log("handle ready in TrackedContent ?")
  console.log(isReady)
  if (!view && (Meteor.isServer || isReady)) {
    history.push('/not-found')
  }

  return {
    ...props,
    layout: view && view.layout,
  }
})(Content));

const ConnectedContent = () => {
  const { context, query, isReady } = useContext(Context);
  const { isNavHidden, hideNav, isMenuOpen } = useContext(InterfaceContext);


  console.log("handle ready in ConnectedContent ?")
  console.log(isReady)
  return (
    <TrackedContent
      isReady
      isMenuOpen
      isNavHidden
      query={query}
      context={context}
      hideNav={hideNav}
    />
  );
}

export default ConnectedContent;
