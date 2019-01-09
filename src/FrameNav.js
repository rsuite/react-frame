// @flow

import * as React from 'react';
import { Sidebar, Sidenav } from 'rsuite';
import classNames from 'classnames';
import { setDisplayName } from 'recompose';
import NavToggle from './NavToggle';
import { FrameContext } from './Frame';

type Props = {
  logo?: React.Node,
  apps?: Array<any>,
  style?: Object,
  brand: string | React.Node,
  expand: boolean,
  hideLogo: boolean,
  showMenu: boolean,
  activeName: string,
  activeCode: string,
  dynamicIcon: boolean,
  svgPrefix: string,
  iconKey: string,
  iconGreyKey: string,
  className: string,
  children: React.Node,
  onExpand: () => void,
  renderTitle: () => any,
  updateProps: (expand: boolean) => void,
  onRenderBottomNav: () => void
};

class FrameNav extends React.Component<Props> {
  static defaultProps = {
    showMenu: true
  };
  // 侧边栏宽度
  static SIDEBAR_WIDTH = 250;
  // 九宫格侧边栏宽度
  static GRID_SIDEBAR_WIDTH = 46;
  // 侧边栏收起的宽度
  static SIDEBAR_FOLD_WIDTH = 56;
  // 有九宫格侧边栏时 侧边栏宽度
  static WITH_APPS_SIDEBAR_WIDTH = FrameNav.SIDEBAR_WIDTH - FrameNav.GRID_SIDEBAR_WIDTH;

  componentDidMount() {
    const { expand, showMenu, updateProps } = this.props;
    updateProps && updateProps(expand, showMenu);
  }

  componentDidUpdate(prevProps: Props) {
    const { expand, updateProps } = this.props;
    if (prevProps.expand !== expand) {
      updateProps && updateProps(expand);
    }
  }

  renderBrand() {
    const { brand } = this.props;

    if (React.isValidElement(brand)) {
      return brand;
    }

    return null;
  }

  renderHeader() {
    const { renderTitle, expand } = this.props;
    return (
      <Sidenav.Header>
        <div className="header-hrand">
          {this.renderBrand()}
          {expand && renderTitle()}
        </div>
      </Sidenav.Header>
    );
  }

  render() {
    const {
      style,
      expand,
      className,
      showMenu = false,
      children,
      onExpand,
      onRenderBottomNav
    } = this.props;

    const styles = Object.assign({}, style, {
      display: 'flex',
      flexDirection: 'column',
      left: 0
    });

    const expandControl = expand ? 'expand' : 'fold';

    return (
      <div className={classNames('hypers-frame-nav-wrap without-apps', expandControl)}>
        {showMenu ? (
          <Sidebar
            style={styles}
            width={expand ? FrameNav.SIDEBAR_WIDTH : FrameNav.SIDEBAR_FOLD_WIDTH}
            className={className}
            collapsible
          >
            <Sidenav.Header>{this.renderHeader()}</Sidenav.Header>
            {children}
            <NavToggle expand={expand} onToggle={onExpand}>
              {onRenderBottomNav && onRenderBottomNav()}
            </NavToggle>
          </Sidebar>
        ) : null}
      </div>
    );
  }
}

const enhance = props => (
  <FrameContext.Consumer>
    {context => <FrameNav {...props} updateProps={context.updateProps} />}
  </FrameContext.Consumer>
);
export default setDisplayName('Frame.Nav')(enhance);
