import React from 'react';
import { CardTitle,CardText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../index.css'

import { AuthUserContext } from '../Session';

class EditBookContents extends React.Component {
  render() {
    let contextVal = this.context;
    return (
      <div className="book-contents">
        {contextVal.authAdmin && <a href="#" onClick={this.props.handleSubmit}><FontAwesomeIcon icon="check" className="edit-icon" /></a>}
        <CardTitle><input value={this.props.inputs.bookTitle} onChange={this.props.handleInputChange} className="form-control title-form"></input></CardTitle>
        <CardText><input value={this.props.inputs.bookDesc} onChange={this.props.handleInputChange} className="form-control"></input></CardText>
      </div>
    );
  }
}
EditBookContents.contextType = AuthUserContext;

export default EditBookContents;
