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

    componentDidMount() {
        const items = this.state.items.map(item => {
            item.selected = item.id === this.props.shelf;
            return item;
        });

        this.setState({
            items
        });
    }

    buttonOnClick = () => {
        this.setState({
            showList: !this.state.showList
        });
    }

    itemOnClick = (e) => {
        if (e.target.className !== '') {
            return;
        }

        const itemSelected = this.state.items.find(item => item.id === e.target.dataset.key);
        itemSelected.selected = false

        const items = this.state.items.map(item => {
            item.selected = item.id === e.target.dataset.key;
            return item;
        });

        this.setState({
            items,
            showList: !this.state.showList
        });

        this.props.moveBook(e.target.dataset.key);
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