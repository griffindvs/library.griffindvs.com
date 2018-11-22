// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

var provider = new firebase.auth.GoogleAuthProvider();

class AddBook extends React.Component {
  render() {
    return (
      <div className="card add-book-card">
        <div className="card-body">
          <a href="#"><i className="fa fa-plus fa-3x add-book-icon"></i></a>
        </div>
      </div>
    );
  }
}

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.editReload = this.editReload.bind(this);
    this.remove = this.remove.bind(this);
    this.edit = this.edit.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.descChange = this.descChange.bind(this);
  }

  editReload(e) {
    e.preventDefault();
    // console.log("Completing Edit: " + this.props.bookItem.id);
    this.props.onEditReload(this.props.bookItem.id);
  }

  remove(e) {
    e.preventDefault();
    // console.log("Removing: " + this.props.bookItem.id);
    this.props.onRemove(this.props.bookItem.id);
  }

  edit(e) {
    e.preventDefault();
    // console.log("Editing: " + this.props.bookItem.id);
    this.props.onEditReload(this.props.bookItem.id);
  }

  titleChange(e) {
    // console.log("Title Change: " + this.props.bookItem.id);
    this.props.onTitleChange(this.props.bookItem.id, e.target.value);
  }

  descChange(e) {
    // console.log("Desc Change: " + this.props.bookItem.id);
    this.props.onDescChange(this.props.bookItem.id, e.target.value);
  }

  render() {
    const bookItem = this.props.bookItem;
    const editing = this.props.bookItem.edit;
    // console.log("Book Render: " + editing);
    BookContents = (
      <div className="book-contents">
        {this.props.isAdmin && <a href="#" onClick={this.edit}><i className="fa fa-pen edit-icon"></i></a>}
        <h5 className="card-title">{bookItem.title}</h5>
        <p className="card-text">{bookItem.desc}</p>
      </div>
    );

    if (editing === true) {
      BookContents = (
        <div className="book-contents">
          <a href="#" onClick={this.editReload}><i className="fa fa-check edit-icon"></i></a>
          <h5 className="card-title"><input value={bookItem.title} onChange={this.titleChange} className="form-control title-form"></input></h5>
          <p className="card-text"><input value={bookItem.desc} onChange={this.descChange} className="form-control"></input></p>
        </div>
      );
    }

    return (
      <div className="card">
        <div className="card-body">
          {this.props.isAdmin && <a href="#" onClick={this.remove}><i className="fa fa-times fa-lg edit-icon"></i></a>}
          {BookContents}
        </div>
      </div>
    );
  }
}

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList,
      user: null,
      isAdmin: false,
    };
    this.handleEditReload = this.handleEditReload.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAdmin = this.handleAdmin.bind(this);
  }

  handleEditReload(id) {
    const newState = this.state;
    const index = newState.bookList.findIndex(a => a.id === id);
    if (index === -1) return;

    newState.bookList[index].edit = !(newState.bookList[index].edit);

    this.setState(newState);
  }

  handleRemove(id) {
    const newState = this.state;
    const index = newState.bookList.findIndex(a => a.id === id);

    if (index === -1) return;
    newState.bookList.splice(index, 1);

    this.setState(newState);
  }

  handleTitleChange(id, val) {
    // console.log("Handling title change");
    const newState = this.state;
    const index = newState.bookList.findIndex(a => a.id === id);

    if (index === -1) return;
    newState.bookList[index].title = val;

    // console.log("Finished change: " + newState.bookList[index].title)
    this.setState(newState);
  }

  handleDescChange(id, val) {
    const newState = this.state;
    const index = newState.bookList.findIndex(a => a.id === id);

    if (index === -1) return;
    newState.bookList[index].desc = val;

    this.setState(newState);
  }

  logout(e) {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  login(e) {
    e.preventDefault();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user: user
        });
      });
  }

  handleAdmin() {
    console.log("handling admin: " + this.state.user);
    if (this.state.user) {
      console.log("user is not null");
      db.collection("users").doc(this.state.user.uid).get().then(function(doc) {
        if (doc.exists) {
          if (doc.data().admin) {
            console.log("Returning true");
            return true;
          }
        } else {
          console.log("Invalid Document Name");
        }
      }).catch(function(error) {
        console.log("Error getting document: " + error);
      });
    }
    return false;
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("setting state");
        this.setState({
        user: user,
        });
      }
    });
  }

  render() {
    const bookList = this.state.bookList;
    const items = [];

    // console.log("Main Render: " + bookList[0].edit);

    for (let i in bookList) {
      items.push(
        <div className="book">
        <Book
          bookItem={bookList[i]}
          onRemove={this.handleRemove}
          onTitleChange = {this.handleTitleChange}
          onDescChange = {this.handleDescChange}
          onEditReload = {this.handleEditReload}
          isAdmin = {this.state.isAdmin}
        />
        </div>
      );
    }

    return (
      <div className="main">
        <nav className="navbar sticky-top navbar-expand-lg navbar-transparent">
          <a className="navbar-brand nav-logo">Griffin's Library</a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              {/* <li className="nav-item">
                {this.state.user && <img className="user-avatar" src={this.state.user.photoURL} alt={this.state.user.displayName}></img>}
              </li> */}
              <li className="nav-item">
                {this.state.user ?
                  <a className="nav-link" href="#" onClick={this.logout}><i class="fa fa-sign-out-alt"></i> Logout</a>
                  :
                  <a className="nav-link" href="#" onClick={this.login}><i class="fa fa-lock"></i> Login</a>
                }
              </li>
            </ul>
          </div>
        </nav>

        <div className="library">
          {items}
          {this.state.isAdmin &&
            <div className="add-book">
              <AddBook />
            </div>
          }
        </div>
    </div>
    );
  }
}

const bookList = [
  {id: '1', title: 'Book 1', desc: 'Words!', edit: 'false'},
  {id: '2', title: 'Book 2', desc: 'Words!', edit: 'false'},
  {id: '3', title: 'Book 3', desc: 'Words!', edit: 'false'},
  {id: '4', title: 'Book 4', desc: 'Words!', edit: 'false'},
];

ReactDOM.render(
  <Library />,
  document.getElementById("root")
);
