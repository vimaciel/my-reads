import React, { Component } from "react";
import Shelf from './Shelf';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Home extends Component {

    moveBook = (book, shelf) => this.props.moveBook(book, shelf);

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {this.props.shelves.map(shelf => (
                        <Shelf key={shelf.id} title={shelf.title} moveBook={this.moveBook} books={this.props.books.filter(books => books.shelf === shelf.id)} />
                    ))}
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    shelves: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired
}

export default Home;