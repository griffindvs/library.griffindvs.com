import React from 'react';
import { CardTitle,CardText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../index.css'

import { AuthUserContext } from '../Session';

class BookContents extends React.Component {
  render() {
    let contextVal = this.context;
    return (
      <div className="book-contents">
        {contextVal.authAdmin && <a href="#" onClick={() => this.props.setEditing({editing: true})}><FontAwesomeIcon icon="pen" className="edit-icon" /></a>}
        <CardTitle>{this.props.inputs.bookTitle}</CardTitle>
        <CardText>{this.props.inputs.bookDesc}</CardText>
      </div>
    );
  }
}
BookContents.contextType = AuthUserContext;

export default BookContents;
