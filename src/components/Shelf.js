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
                <span className="bookshelf-title">{this.props.title}</span>
                <div className="bookshelf-books">
                    <div className="books-grid">
                        {this.props.books.map(book => (
                            <Book key={book.id} moveBook={this.moveBook} book={book} />
                        ))}
                    </div>
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

