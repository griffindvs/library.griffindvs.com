import React, { useState } from 'react';
import { Collapse,Navbar,NavbarToggler,NavbarBrand } from 'reactstrap';

import '../../index.css'

import { AuthUserContext } from '../Session';
import SignedInNav from '../SignedInNav';
import SignedOutNav from '../SignedOutNav';

function MainNav(props) {
  // Accesses the Firebase props passed via context
  const auth = props.firebase.auth;
  const provider = props.firebase.provider;

  const [navCollapse, setNavCollapse] = useState(false);

  function login() {
    // Calls the Firebase sign-in method
    auth.signInWithRedirect(provider);
  }

  function logout() {
    // Calls the Firebase sign-out method
    auth.signOut();
  }

  return(
    <Navbar color="transparent" dark expand="md">
      <NavbarBrand href="/">Griffin's Library</NavbarBrand>
      <NavbarToggler onClick={() => setNavCollapse(!navCollapse)} />
      <Collapse isOpen={navCollapse} navbar>
      <AuthUserContext.Consumer>
        {contextVal =>
          contextVal.authUser ?
            <SignedInNav logoutHandler={logout} />
          :
            <SignedOutNav loginHandler={login} />
        }
      </AuthUserContext.Consumer>
      </Collapse>
    </Navbar>
  );
}

export default MainNav;
