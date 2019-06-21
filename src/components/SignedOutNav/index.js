import React from 'react';
import { Nav,NavItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../index.css'

class SignedOutNav extends React.Component {
  render() {
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <button type="button" className="btn btn-light nav-button" onClick={this.props.loginHandler}><FontAwesomeIcon icon="lock" /> Login</button>
        </NavItem>
      </Nav>
    );
  }
}

export default SignedOutNav;
