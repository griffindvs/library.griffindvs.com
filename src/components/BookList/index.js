import React, { useState, useEffect } from 'react';

import '../../index.css'

import Book from '../Book';

function BookList(props) {
  // Accesses the Firebase props passed via context
  const db = props.firebase.db;

  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    const bookItems = [];
    db.collection("books").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        bookItems.push(
          { id: bookItems.length, title: doc.data().title, desc: doc.data().desc }
        );
      });
      setBookList(bookItems);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="library">
      {bookList.map((book, index) => (
        <Book key={book.id} title={book.title} desc={book.desc}/>
      ))}
    </div>
  );
}

export default BookList;
