import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import PropTypes from 'prop-types';

class Search extends Component {

    /**
     * @description Function responsible for change text search whenever the user hint a new word
     * @param {Event} e - The Object Event
     */
    searchTextChanged = (e) => {
        this.props.searchTextChanged(e.target.value);
    }

    /**
     * @description Function responsible for move book to other shelf
     * @param {Object} book - book selected as object
     * @param {string} shelf - shelf's id as string
     */
    moveBook = (book, shelf) => {
        this.props.moveBook(book, shelf);
    }

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
    moveBook: PropTypes.func.isRequired,
    searchTextChanged: PropTypes.func.isRequired
}

export default Search;