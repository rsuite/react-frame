import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Icon, Sidenav, Nav, Dropdown } from 'rsuite';
import { Link } from 'react-router';
import { on, getHeight } from 'dom-lib';
import Frame from '../src';
import './less/index.less';

const styles = {
  icon: {
    width: 56,
    height: 56,
    lineHeight: '56px',
    textAlign: 'center'
  },
  navItem: {
    width: 56,
    textAlign: 'center'
  }
};

const navs = [
  {
    key: '1',
    icon: <Icon icon="dashboard" />,
    text: 'Dashboard',
    link: '/dashboard'
  },
  {
    key: '2',
    icon: <Icon icon="group" />,
    text: 'Members',
    link: '/list/members'
  },
  {
    key: '3',
    text: 'Errors',
    icon: <Icon icon="exclamation-triangle" />,
    children: [
      {
        key: '3-1',
        text: '404',
        link: '/error/404'
      },
      {
        key: '3-1',
        text: '500',
        link: '/error/500'
      }
    ]
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowHeight: getHeight(window),
      expand: true
    };
    this.resizeListenner = on(window, 'resize', this.updateHeight);
  }

  componentWillUnmount() {
    if (this.resizeListenner) {
      this.resizeListenner.off();
    }
  }

  getLogo() {
    return <img alt="" height="20" width="20" src="https://rsuitejs.com/favicon.ico" />;
  }

  resizeListenner = null;

  updateHeight = () => {
    this.setState({
      windowHeight: getHeight(window)
    });
  };

  handleToggle = () => {
    this.setState({
      expand: !this.state.expand
    });
  };

  renderSidenav() {
    const { expand, windowHeight } = this.state;
    let navBodyStyle = null;
    if (expand) {
      navBodyStyle = {
        height: windowHeight - 112,
        overflow: 'auto'
      };
    }
    return (
      <Sidenav expanded={expand} defaultOpenKeys={['3']} activeKey={[]} appearance="subtle">
        <Sidenav.Body style={navBodyStyle}>
          <Nav>
            {this.renderNavs()}
            <Nav.Item
              href="https://github.com/rsuite/rsuite-management-system"
              icon={<Icon icon="github" />}
              target="_blank"
            >
              Github
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    );
  }

  renderNavs() {
    return navs.map(item => {
      if (item.children) {
        return (
          <Dropdown
            key={item.key}
            eventKey={item.key}
            placement="rightTop"
            trigger="hover"
            title="Errors"
            icon={item.icon}
          >
            {item.children.map(child => (
              <Dropdown.Item
                key={child.key}
                eventKey={child.key}
                componentClass={Link}
                to={child.link}
                activeClassName="nav-item-active"
              >
                {child.text}
              </Dropdown.Item>
            ))}
          </Dropdown>
        );
      }

      return (
        <Nav.Item
          key={item.key}
          eventKey={item.key}
          icon={item.icon}
          componentClass={Link}
          to={item.link}
          activeClassName="nav-item-active"
        >
          {item.text}
        </Nav.Item>
      );
    });
  }

  renderBottomNav = () => {
    const { expand } = this.state;
    return (
      <Nav>
        <Dropdown
          placement={expand ? 'topLeft' : 'rightBottom'}
          trigger="click"
          renderTitle={children => {
            return <Icon style={styles.icon} icon="cog" />;
          }}
        >
          <Dropdown.Item>Help</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
      </Nav>
    );
  };

  renderTitle = () => <span style={{ marginLeft: '20px' }}>React Frame</span>;

  render() {
    const { expand } = this.state;
    return (
      <Frame>
        <Frame.Nav
          renderTitle={this.renderTitle}
          brand={this.getLogo()}
          expand={expand}
          onExpand={this.handleToggle}
          onRenderBottomNav={this.renderBottomNav}
        >
          {this.renderSidenav()}
        </Frame.Nav>
        <Frame.Content>content</Frame.Content>
      </Frame>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
