import React, { Component } from "react";
import Shelf from './Shelf';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col, Row, Container } from 'reactstrap';

class Home extends Component {

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
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <Container>
                    <Row>
                        {this.props.shelves.map(shelf => (
                            <Col key={shelf.id} md="4" className="d-flex align-items-stretch">
                                <Shelf loadingBooks={this.props.loadingBooks} key={shelf.id} id={shelf.id} title={shelf.title} moveBook={this.moveBook} books={this.props.books.filter(books => books.shelf === shelf.id)} />
                            </Col>
                        ))}
                    </Row>
                </Container>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    shelves: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
}

export default Home;