import React from 'react'
import './styles/App.css';
import Home from './components/Home';
import Search from './components/Search';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class App extends React.Component {
  state = {
    shelves: [
      {
        id: 'currentlyReading',
        title: 'Currently Reading',
      },
      {
        id: 'wantToRead',
        title: 'Want to Read',
      },
      {
        id: 'read',
        title: 'Read',
      }
    ],
    books: [],
    searchBooks: [],
    searchText: ''
  }

  /**
   * @description Function responsible for move book to other shelf.
   * This function calls the api and then the shelves are updated
   * @param {Object} book - book selected as object
   * @param {string} shelf - shelf's id as string
   */
  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getAllBooks();
    });
  }

  
  componentDidMount() {
    this.getAllBooks();
  }
  
  /**
   * @description Get all books from api and then update the state with those books
   */
  getAllBooks = () => {
    BooksAPI.getAll().then(response => {
      this.setState({
        books: response
      })
    })
  }

  /**
   * @description When user hint a new word on search books this function is fired. 
   * The api returns books that match with the user's query and then set the state with these result.
   */
  searchTextChanged = (searchText) => {
    this.setState({ searchText: searchText });

    let searchBooks = [];

    if (searchText === '') {
      this.setState({ searchBooks })
      return;
    }

    BooksAPI.search(searchText).then(response => {
      searchBooks = response.error !== 'empty query' ? response : [];
      this.setState({ searchBooks });
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <Home shelves={this.state.shelves} books={this.state.books} moveBook={this.moveBook} />} />
        <Route exact path="/search" render={() => <Search searchText={this.state.searchText} searchTextChanged={this.searchTextChanged} books={this.state.searchBooks} moveBook={this.moveBook} />} />
      </div>
    )
  }
}

export default App;
