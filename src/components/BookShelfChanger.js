import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookShelfChanger extends Component {
    state = {
        showList: false,
        items: [
            {
                id: 'currentlyReading',
                text: 'Currently Reading',
                selected: false,
            },
            {
                id: 'wantToRead',
                text: 'Want to Read',
                selected: false,
            },
            {
                id: 'read',
                text: 'Read',
                selected: false
            },
            {
                id: 'none',
                text: 'None',
                selected: false
            }
        ]
    }
   
    /**
     * @description Select item if exists an item selected passed by props.
     */
    componentDidMount() {
        const items = this.selectItem(this.props.shelf);
        this.setState({
            items
        });
    }

    /**
     * @description Function responsible for hide/show the list of items.
     */
    buttonOnClick = () => {
        this.setState({
            showList: !this.state.showList
        });
    }

    /**
     * @description Function responsible for move book to other shelf.
     * If the item has a class it means this item is selected and the process stops in this scenario.
     * @param {Event} e - The Event Object
     */
    itemOnClick = (e) => {
        if (e.target.className !== '') {
            return;
        }

        const items = this.selectItem(e.target.dataset.key)

        this.setState({
            items,
            showList: !this.state.showList
        });

        this.props.moveBook(e.target.dataset.key);
    }

    /**
     * @description Whenever witch one item is selected, this function changes the selected item to true 
     * @param {string} id - Id of the selected item
     * @returns {Array} Items updated
     */
    selectItem = (id) => {
        return this.state.items.map(item => {
            item.selected = item.id === id;
            return item;
        });
    }

    render() {
        return (
            <div>
                <input type="button" className="book-shelf-changer" onClick={this.buttonOnClick} />
                <ol className="book-shelf-changer-list" style={{ display: this.state.showList ? 'block' : 'none' }}>
                    <li className="move-book-header">Move to...</li>
                    {this.state.items.map(map => (
                        <li key={map.id} data-key={map.id} onClick={this.itemOnClick} className={map.selected ? 'shelf-selected' : ''}>{map.text}</li>
                    ))}
                </ol>
            </div>
        );
    }
}

BookShelfChanger.defaultProps = {
    shelf: ''
}

BookShelfChanger.propTypes = {
    shelf: PropTypes.string,
    moveBook: PropTypes.func.isRequired
}

export default BookShelfChanger;