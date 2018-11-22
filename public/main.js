var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

var provider = new firebase.auth.GoogleAuthProvider();

var AddBook = function (_React$Component) {
  _inherits(AddBook, _React$Component);

  function AddBook() {
    _classCallCheck(this, AddBook);

    return _possibleConstructorReturn(this, (AddBook.__proto__ || Object.getPrototypeOf(AddBook)).apply(this, arguments));
  }

  _createClass(AddBook, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "card add-book-card" },
        React.createElement(
          "div",
          { className: "card-body" },
          React.createElement(
            "a",
            { href: "#" },
            React.createElement("i", { className: "fa fa-plus fa-3x add-book-icon" })
          )
        )
      );
    }
  }]);

  return AddBook;
}(React.Component);

var Book = function (_React$Component2) {
  _inherits(Book, _React$Component2);

  function Book(props) {
    _classCallCheck(this, Book);

    var _this2 = _possibleConstructorReturn(this, (Book.__proto__ || Object.getPrototypeOf(Book)).call(this, props));

    _this2.editReload = _this2.editReload.bind(_this2);
    _this2.remove = _this2.remove.bind(_this2);
    _this2.edit = _this2.edit.bind(_this2);
    _this2.titleChange = _this2.titleChange.bind(_this2);
    _this2.descChange = _this2.descChange.bind(_this2);
    return _this2;
  }

  _createClass(Book, [{
    key: "editReload",
    value: function editReload(e) {
      e.preventDefault();
      // console.log("Completing Edit: " + this.props.bookItem.id);
      this.props.onEditReload(this.props.bookItem.id);
    }
  }, {
    key: "remove",
    value: function remove(e) {
      e.preventDefault();
      // console.log("Removing: " + this.props.bookItem.id);
      this.props.onRemove(this.props.bookItem.id);
    }
  }, {
    key: "edit",
    value: function edit(e) {
      e.preventDefault();
      // console.log("Editing: " + this.props.bookItem.id);
      this.props.onEditReload(this.props.bookItem.id);
    }
  }, {
    key: "titleChange",
    value: function titleChange(e) {
      // console.log("Title Change: " + this.props.bookItem.id);
      this.props.onTitleChange(this.props.bookItem.id, e.target.value);
    }
  }, {
    key: "descChange",
    value: function descChange(e) {
      // console.log("Desc Change: " + this.props.bookItem.id);
      this.props.onDescChange(this.props.bookItem.id, e.target.value);
    }
  }, {
    key: "render",
    value: function render() {
      var bookItem = this.props.bookItem;
      var editing = this.props.bookItem.edit;
      // console.log("Book Render: " + editing);
      BookContents = React.createElement(
        "div",
        { className: "book-contents" },
        this.props.isAdmin && React.createElement(
          "a",
          { href: "#", onClick: this.edit },
          React.createElement("i", { className: "fa fa-pen edit-icon" })
        ),
        React.createElement(
          "h5",
          { className: "card-title" },
          bookItem.title
        ),
        React.createElement(
          "p",
          { className: "card-text" },
          bookItem.desc
        )
      );

      if (editing === true) {
        BookContents = React.createElement(
          "div",
          { className: "book-contents" },
          React.createElement(
            "a",
            { href: "#", onClick: this.editReload },
            React.createElement("i", { className: "fa fa-check edit-icon" })
          ),
          React.createElement(
            "h5",
            { className: "card-title" },
            React.createElement("input", { value: bookItem.title, onChange: this.titleChange, className: "form-control title-form" })
          ),
          React.createElement(
            "p",
            { className: "card-text" },
            React.createElement("input", { value: bookItem.desc, onChange: this.descChange, className: "form-control" })
          )
        );
      }

      return React.createElement(
        "div",
        { className: "card" },
        React.createElement(
          "div",
          { className: "card-body" },
          this.props.isAdmin && React.createElement(
            "a",
            { href: "#", onClick: this.remove },
            React.createElement("i", { className: "fa fa-times fa-lg edit-icon" })
          ),
          BookContents
        )
      );
    }
  }]);

  return Book;
}(React.Component);

var Library = function (_React$Component3) {
  _inherits(Library, _React$Component3);

  function Library(props) {
    _classCallCheck(this, Library);

    var _this3 = _possibleConstructorReturn(this, (Library.__proto__ || Object.getPrototypeOf(Library)).call(this, props));

    _this3.state = {
      bookList: bookList,
      user: null,
      isAdmin: false
    };
    _this3.handleEditReload = _this3.handleEditReload.bind(_this3);
    _this3.handleRemove = _this3.handleRemove.bind(_this3);
    _this3.handleTitleChange = _this3.handleTitleChange.bind(_this3);
    _this3.handleDescChange = _this3.handleDescChange.bind(_this3);
    _this3.login = _this3.login.bind(_this3);
    _this3.logout = _this3.logout.bind(_this3);
    _this3.handleAdmin = _this3.handleAdmin.bind(_this3);
    return _this3;
  }

  _createClass(Library, [{
    key: "handleEditReload",
    value: function handleEditReload(id) {
      var newState = this.state;
      var index = newState.bookList.findIndex(function (a) {
        return a.id === id;
      });
      if (index === -1) return;

      newState.bookList[index].edit = !newState.bookList[index].edit;

      this.setState(newState);
    }
  }, {
    key: "handleRemove",
    value: function handleRemove(id) {
      var newState = this.state;
      var index = newState.bookList.findIndex(function (a) {
        return a.id === id;
      });

      if (index === -1) return;
      newState.bookList.splice(index, 1);

      this.setState(newState);
    }
  }, {
    key: "handleTitleChange",
    value: function handleTitleChange(id, val) {
      // console.log("Handling title change");
      var newState = this.state;
      var index = newState.bookList.findIndex(function (a) {
        return a.id === id;
      });

      if (index === -1) return;
      newState.bookList[index].title = val;

      // console.log("Finished change: " + newState.bookList[index].title)
      this.setState(newState);
    }
  }, {
    key: "handleDescChange",
    value: function handleDescChange(id, val) {
      var newState = this.state;
      var index = newState.bookList.findIndex(function (a) {
        return a.id === id;
      });

      if (index === -1) return;
      newState.bookList[index].desc = val;

      this.setState(newState);
    }
  }, {
    key: "logout",
    value: function logout(e) {
      var _this4 = this;

      e.preventDefault();
      firebase.auth().signOut().then(function () {
        _this4.setState({
          user: null
        });
      });
    }
  }, {
    key: "login",
    value: function login(e) {
      var _this5 = this;

      e.preventDefault();
      firebase.auth().signInWithPopup(provider).then(function (result) {
        var user = result.user;
        _this5.setState({
          user: user
        });
      });
    }
  }, {
    key: "handleAdmin",
    value: function handleAdmin() {
      console.log("handling admin: " + this.state.user);
      if (this.state.user) {
        console.log("user is not null");
        db.collection("users").doc(this.state.user.uid).get().then(function (doc) {
          if (doc.exists) {
            if (doc.data().admin) {
              console.log("Returning true");
              return true;
            }
          } else {
            console.log("Invalid Document Name");
          }
        }).catch(function (error) {
          console.log("Error getting document: " + error);
        });
      }
      return false;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this6 = this;

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          console.log("setting state");
          _this6.setState({
            user: user
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var bookList = this.state.bookList;
      var items = [];

      // console.log("Main Render: " + bookList[0].edit);

      for (var i in bookList) {
        items.push(React.createElement(
          "div",
          { className: "book" },
          React.createElement(Book, {
            bookItem: bookList[i],
            onRemove: this.handleRemove,
            onTitleChange: this.handleTitleChange,
            onDescChange: this.handleDescChange,
            onEditReload: this.handleEditReload,
            isAdmin: this.state.isAdmin
          })
        ));
      }

      return React.createElement(
        "div",
        { className: "main" },
        React.createElement(
          "nav",
          { className: "navbar sticky-top navbar-expand-lg navbar-transparent" },
          React.createElement(
            "a",
            { className: "navbar-brand nav-logo" },
            "Griffin's Library"
          ),
          React.createElement(
            "div",
            { className: "collapse navbar-collapse" },
            React.createElement(
              "ul",
              { className: "navbar-nav ml-auto" },
              React.createElement(
                "li",
                { className: "nav-item" },
                this.state.user ? React.createElement(
                  "a",
                  { className: "nav-link", href: "#", onClick: this.logout },
                  React.createElement("i", { "class": "fa fa-sign-out-alt" }),
                  " Logout"
                ) : React.createElement(
                  "a",
                  { className: "nav-link", href: "#", onClick: this.login },
                  React.createElement("i", { "class": "fa fa-lock" }),
                  " Login"
                )
              )
            )
          )
        ),
        React.createElement(
          "div",
          { className: "library" },
          items,
          this.state.isAdmin && React.createElement(
            "div",
            { className: "add-book" },
            React.createElement(AddBook, null)
          )
        )
      );
    }
  }]);

  return Library;
}(React.Component);

var bookList = [{ id: '1', title: 'Book 1', desc: 'Words!', edit: 'false' }, { id: '2', title: 'Book 2', desc: 'Words!', edit: 'false' }, { id: '3', title: 'Book 3', desc: 'Words!', edit: 'false' }, { id: '4', title: 'Book 4', desc: 'Words!', edit: 'false' }];

ReactDOM.render(React.createElement(Library, null), document.getElementById("root"));