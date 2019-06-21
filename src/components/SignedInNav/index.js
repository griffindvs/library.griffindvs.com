import React from 'react';
import { Nav,NavItem,Dropdown,DropdownMenu,DropdownItem,DropdownToggle,Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../index.css'

import { AuthUserContext } from '../Session';

class SignedInNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDropdown: false
    }
  }

  userDropdownToggle = () => {
    this.setState({
      userDropdown: !this.state.userDropdown
    });
  }

  render() {
    let contextVal = this.context;
    return (
      <Nav className="ml-auto" navbar>
        <Dropdown isOpen={this.state.userDropdown} toggle={this.userDropdownToggle}>
          <DropdownToggle color="light" className="user-dropdown">
            <Row>
              <div className="image-cropper">
                <img className="user-avatar" src={contextVal.authUser.photoURL} alt={contextVal.authUser.displayName} width="40px"></img>
              </div>
              <div className="nav-username">
                {contextVal.authUser.displayName}
              </div>
            </Row>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem disabled>{contextVal.authUser.email}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavItem>
          <button type="button" className="btn btn-light nav-button" onClick={this.props.logoutHandler}><FontAwesomeIcon icon="sign-out-alt" /> Logout</button>
        </NavItem>
      </Nav>
    );
  }
}
SignedInNav.contextType = AuthUserContext;

export default SignedInNav;
