import React, { Component } from 'react';
import Book from './Book';
import PropTypes from "prop-types";

class Shelf extends Component {

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
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map(book => (
                            <li key={book.id}>
                                <Book moveBook={this.moveBook} book={book} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

Shelf.propTypes = {
    title: PropTypes.string.isRequired,
    moveBook: PropTypes.func.isRequired
}

export default Shelf;

