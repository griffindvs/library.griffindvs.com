import React from 'react';

import { withAuthentication } from '../Session';
import { withFirebase } from '../Firebase';

import MainNav from '../MainNav';
import BookList from '../BookList';

function App(props) {
  const MainNavFirebase = withFirebase(MainNav);
  const BookListFirebase = withFirebase(BookList);

  return (
    <div className="main">
      <MainNavFirebase />
      <BookListFirebase />
    </div>
  );
}

// Exports with access to the Authentication context
export default withAuthentication(App);
