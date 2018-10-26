import React, { Component } from "react";
import BookShelfChanger from './BookShelfChanger';

class Book extends Component {
    state = {
        movingBook: false
    }

    createBookTitle = () => {
        const year = this.props.book.publishedDate !== undefined ? this.props.book.publishedDate.split('-')[0] : null;
        const title = this.props.book.title;
        return <div>
            <span>{title}</span>
            <span>{year !== null ? ` (${year})` : false}</span>
        </div>
    }

    moveBook = (shelf) => {
        this.setState({ movingBook: true })
        this.props.moveBook(this.props.book, shelf);

        setTimeout(() => {
            this.setState({ movingBook: false })
        }, 2000);
    }

    render() {
        const authors = this.props.book.authors !== undefined ? (
            <ol>
                {this.props.book.authors.map(author => (
                    <li key={this.props.book.authors.indexOf(author)}>{author}</li>
                ))}
            </ol>
        ) : false;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
                    <i style={{ display: this.state.movingBook ? 'block' : 'none' }} className="moving-book">moving the book...</i>
                    <BookShelfChanger shelf={this.props.book.shelf} moveBook={this.moveBook} />
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

export default Book;