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

    onDrop = (ev) => {
        const book = JSON.parse(ev.dataTransfer.getData('text'));
        this.props.moveBook(book, this.props.id);
    }

    render() {
        return (
            <div id={this.props.id} className="bookshelf"
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDrop={this.onDrop}>
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
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    moveBook: PropTypes.func.isRequired
}

export default Shelf;

