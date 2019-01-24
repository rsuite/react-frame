// @flow

import * as React from 'react';
import classNames from 'classnames';
import { Container, Content } from 'rsuite';
import { setDisplayName } from 'recompose';
import { FrameContext } from './Frame';

type Props = {
  style?: Object,
  expand: boolean,
  showMenu: boolean,
  className?: string,
  children: React.Node
};
const FrameContent = ({ style, expand, showMenu, className = '', children }: Props) => {
  const classes = classNames(`page-container ${className}`, {
    'page-container-fill': showMenu && expand
  });
  return expand !== null ? (
    <Container style={style} className={classes}>
      <Content>{children}</Content>
    </Container>
  ) : null;
};

const enhance = props => (
  <FrameContext.Consumer>
    {context => <FrameContent {...props} {...context} />}
  </FrameContext.Consumer>
);
export default setDisplayName('Frame.Content')(enhance);
