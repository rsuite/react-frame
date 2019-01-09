// @flow
import * as React from 'react';
import { Nav, Icon, Navbar } from 'rsuite';

type Props = {
  expand: boolean,
  children?: React.Node,
  onToggle: () => void,
};

const style = {
  width: 56,
  textAlign: 'center',
};

const NavToggle = ({ expand, children, onToggle }: Props) => (
  <Navbar appearance="subtle" className="nav-toggle">
    <Navbar.Body>
      {children}
      <Nav pullRight>
        <Nav.Item onClick={onToggle} style={style}>
          <Icon icon={expand ? 'angle-left' : 'angle-right'} />
        </Nav.Item>
      </Nav>
    </Navbar.Body>
  </Navbar>
);

export default NavToggle;
