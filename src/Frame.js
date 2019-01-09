// @flow

import * as React from 'react';
import { Container } from 'rsuite';
import classNames from 'classnames';
import { setStatic } from 'recompose';
import FrameNav from './FrameNav';
import FrameContent from './FrameContent';

type Props = {
  style?: Object,
  children: React.Node,
  className?: string
};

type States = {
  expand?: ?boolean,
  showMenu?: true
};

export const FrameContext = React.createContext({
  expand: null,
  showMenu: true,
  updateProps: null
});

class Frame extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      expand: null
    };
  }

  updateProps = (expand: boolean, showMenu?: boolean = true) => {
    this.setState({
      expand,
      showMenu
    });
  };

  render() {
    const { expand, showMenu } = this.state;
    const { style, className, children } = this.props;

    const classes = classNames('hypers-frame rs-container-has-sidebar', className);

    const contextValue = {
      expand,
      showMenu,
      updateProps: this.updateProps
    };
    return (
      <Container style={style} className={classes}>
        <FrameContext.Provider value={contextValue}>{children}</FrameContext.Provider>
      </Container>
    );
  }
}

setStatic('Nav', FrameNav)(Frame);
setStatic('Content', FrameContent)(Frame);
export default Frame;
