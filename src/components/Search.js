import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import PropTypes from 'prop-types';

class Search extends Component {
    searchTextChanged = (e) => {
        this.props.searchTextChanged(e.target.value);
    }

    moveBook = (book, shelf) => this.props.moveBook(book, shelf);

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/" />
                    <div className="search-books-input-wrapper">
                        <input type="text" value={this.props.searchText} onChange={this.searchTextChanged} placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.props.books.map(book => (
                            <Book key={book.id} book={book} moveBook={this.moveBook} />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired
}

export default Search;