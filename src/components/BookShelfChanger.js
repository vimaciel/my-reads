import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class BookShelfChanger extends Component {
    state = {
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
        ],
        dropdownOpen: false
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

    onToogleDropDown = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <Dropdown isOpen={this.state.dropdownOpen} size="sm" className="book-shelf-changer"
                toggle={this.onToogleDropDown}>
                <DropdownToggle caret color="success">
                    Move book
                </DropdownToggle>
                <DropdownMenu style={{top: 0}}>
                    {this.state.items.map(item => (
                        <DropdownItem id={item.id} data-key={item.id} onClick={this.itemOnClick} key={item.id} disabled={item.selected} className={item.selected ? 'shelf-selected' : ''}>
                            {item.text}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
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