import React, { PureComponent } from "react";
import BookShelfChanger from './BookShelfChanger';
import PropTypes from 'prop-types';
import BookWithoutCoverImage from '../images/book_without_cover.png';

class Book extends PureComponent {
    state = {
        movingBook: false
    }

    /**
     * @description Function responsible for return html block with book's title and year. 
     * Sometimes the book doesn't have the published year, then this case is considered in this function too.
     * @returns {HTMLElement} html element with book's tile and published date (only year).
     */
    createBookTitle = () => {
        const year = this.props.book.publishedDate !== undefined ? this.props.book.publishedDate.split('-')[0] : null;
        const title = this.props.book.title;
        return <div>
            <span>{title}</span>
            <span>{year !== null ? ` (${year})` : false}</span>
        </div>
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
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={{
                            width: 128, height: 193, backgroundImage:
                                `url(${bookThumbnail})`
                        }}>
                    </div>
                    <i style={{ display: this.state.movingBook ? 'block' : 'none' }} className="moving-book">moving the book...</i>
                    <BookShelfChanger shelf={book.shelf} moveBook={this.moveBook} />
                </div >
                <div>
                    <div className="book-title">{this.createBookTitle()}</div>
                    <div className="book-authors">
                        {authors}
                    </div>
                </div>
            </div>
        )
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired
}

export default Book;