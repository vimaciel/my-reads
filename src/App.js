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
    searchText: '',
    loadingBooks: true,
    loadingSearchBooks: false
  }

  /**
   * @description Function responsible for move book to other shelf.
   * This function calls the api and then the shelves are updated
   * @param {Object} book - book selected as object
   * @param {string} shelf - shelf's id as string
   */
  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf);

    book.shelf = shelf;

    const searchBooks = this.state.searchBooks.map(b => {
      if (b.id === book.id) {
        b = book
      }

      return b;
    });

    this.setState(state => {
      return {
        books: state.books.filter(b => b.id !== book.id).concat([book]),
        searchBooks
      }
    });
  }

  /**
   * @description Get all books from api and then update the state with those books
   */
  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books, loadingBooks: false });
  }

  /**
   * @description When user hint a new word on search books this function is fired. 
   * The api returns books that match with the user's query and then set the state with these result.
   */
  searchTextChanged = async (searchText) => {
    this.setState({ searchText: searchText });

    let searchBooks = [];

    if (searchText === '') {
      this.setState({ searchBooks })
      return;
    }

    this.setState({ loadingSearchBooks: true });

    const response = await BooksAPI.search(searchText);
    searchBooks = response.error !== 'empty query' ? response : [];

    searchBooks = searchBooks.map(b => {
      const book = this.state.books.find(book => book.id === b.id);
      book !== undefined ? b.shelf = book.shelf : b.shelf = 'none';
      return b;
    });

    this.setState({ searchBooks, loadingSearchBooks: false });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <Home loadingBooks={this.state.loadingBooks} shelves={this.state.shelves} books={this.state.books} moveBook={this.moveBook} />} />
        <Route exact path="/search" render={() => <Search loadingSearchBooks={this.state.loadingSearchBooks} searchText={this.state.searchText} searchTextChanged={this.searchTextChanged} books={this.state.searchBooks} moveBook={this.moveBook} />} />
      </div>
    )
  }
}

export default App;
