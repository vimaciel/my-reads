import React, { PureComponent } from "react";
import BookShelfChanger from './BookShelfChanger';
import PropTypes from 'prop-types';
import BookWithoutCoverImage from '../images/book_without_cover.png';
import { Card, CardBody, CardTitle, CardImg, CardSubtitle } from 'reactstrap';

class Book extends PureComponent {
    state = {
        movingBook: false
    }

    /**
     * @description Function responsible for return string with book's published year. 
     * Sometimes the book doesn't have the published year, then this case is considered in this function too.
     * @returns {string} string with book's tile and published date (only year).
     */
    createBookSubtitle = () => {
        const year = this.props.book.publishedDate !== undefined ? this.props.book.publishedDate.split('-')[0] : null;
        return year !== null ? ` (${year})` : false;
    }

    /**
     * @description Function responsible for move book to other shelf. 
     * This function controls the visibilty of loading indicator. 
     * To avoid that loading indicator still showing after the end of the process,
     * it was created a setTimeout to hide loading indicator after 2 seconds.
     * @param {string} shelf - shelf's id as string
     */
    moveBook = (shelf) => {
        this.setState({ movingBook: true })
        this.props.moveBook(this.props.book, shelf);

        setTimeout(() => {
            this.setState({ movingBook: false })
        }, 2000);
    }

    render() {
        const book = this.props.book;
        const authors = book.authors !== undefined ? (
            <ol>
                {this.props.book.authors.map(author => (
                    <li key={this.props.book.authors.indexOf(author)}>{author}</li>
                ))}
            </ol>
        ) : false;

        const bookThumbnail = book.imageLinks !== undefined ? book.imageLinks.thumbnail : BookWithoutCoverImage;

        return (
            <Card className="book">
                <CardImg top style={{ width: 128, height: 193 }} src={bookThumbnail} alt="Card image cap" />
                <CardBody>
                    <CardTitle>{book.title}</CardTitle>
                    <CardSubtitle>{this.createBookSubtitle()}</CardSubtitle>
                    <div className="book-authors">
                        {authors}
                    </div>
                </CardBody>
                <BookShelfChanger moveBook={this.moveBook} shelf={book.shelf} />
            </Card>
        )
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired
}

export default Book;