import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import PropTypes from 'prop-types';
import { debounce } from "lodash";

class Search extends Component {

    state = {
        searchText: this.props.searchText
    }

    /**
     * @description Function responsible for change text search whenever the user hint a new word
     * @param {string} text - User's search text
     */
    searchTextChanged = debounce((text) => {
        this.props.searchTextChanged(text);
    }, 600);

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
                        <input type="text" value={this.state.searchText}
                            onChange={(e) => {
                                this.setState({ searchText: e.target.value });
                                this.searchTextChanged(e.target.value);
                            }} placeholder="Search by title or author" />
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