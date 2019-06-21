import React, { useState } from 'react';
import { Card,CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../index.css'

import { AuthUserContext } from '../Session';
import BookContents from '../BookContents';
import EditBookContents from '../EditBookContents';

var initialEditState = {
  bookTitle: '',
  bookDesc: ''
};

function useEdit(initialValues, callback) {
  const [inputs, setInputs] = useState(initialValues);

  function handleSubmit(event) {
    if(event) {
      event.preventDefault();
    }
    callback();
    clearState();
  }

  function handleInputChange(event) {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]:event.target.value}));
  }

  function clearState() {
    setInputs(inputs => ({...initialEditState}));
  }

  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
}

function Book(props) {
  const [editing, setEditing] = useState(false);

  function editBook() {
    const db = props.firebase.db;
    db.collection("books").doc(inputs.bookTitle).set({
      title: inputs.bookTitle,
      desc: inputs.bookDesc
    })
    .then(function() {
      console.log("Book edited");
    })
    .catch(function(error) {
      console.error("Error editing book: ", error);
    })
  }

  initialEditState = {
    bookTitle: props.title,
    bookDesc: props.desc
  };
  const {inputs, handleInputChange, handleSubmit} = useEdit(initialEditState,editBook);

  return(
    <Card>
      <CardBody>
        <AuthUserContext.Consumer>
          {contextVal =>
            contextVal.authAdmin && <a href="#"><FontAwesomeIcon icon="times" size="lg" className="edit-icon" /></a>
          }
        </AuthUserContext.Consumer>
        {editing ?
          <EditBookContents inputs={inputs} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
        :
          <BookContents inputs={inputs} setEditing={setEditing}/>
        }
      </CardBody>
    </Card>
  );
}

export default Book;
