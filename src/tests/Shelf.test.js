import React from 'react';
import Shelf from '../components/Shelf'
import { shallow, mount } from 'enzyme';

describe('<Shelf />', () => {
    const mockProps = {
        id: 'currentlyReading',
        title: 'Currently Reading',
        books: [{
            id: '1',
            title: 'A Game of Thrones',
            publishedDate: '1996-08-01',
            authors: [
                'George R. R. Martin'
            ],
            imageLinks: {
                thumbnail: 'https://en.wikipedia.org/wiki/A_Game_of_Thrones#/media/File:AGameOfThrones.jpg'
            }
        }],
        loadingBooks: false,
        moveBook: jest.fn(),
    }

    const mockedEvent = {
        target: {
            className: '',
            dataset: {
                key: 'read'
            }
        }
    }

    it('Calls moveBook function when book is moved', () => {
        const wrapper = mount(<Shelf {...mockProps} />);
        wrapper.find('#read').at(1).simulate('click', mockedEvent);
        expect(mockProps.moveBook).toHaveBeenCalled();
    })

    it('Check if element title is using prop title', () => {
        const wrapper = shallow(<Shelf {...mockProps} />);
        expect(wrapper.find('.bookshelf-title').text()).toBe(mockProps.title);
    })

    it('Check if loading indicator shows when loadingBooks set to true', () => {
        mockProps.loadingBooks = true;
        const wrapper = mount(<Shelf {...mockProps} />);
        expect(wrapper.find('.loader-indicator').at(1).props().style.display).toBe('block');
    })

    it('Check if loading indicator hides when loadingBooks set to false', () => {
        mockProps.loadingBooks = false;
        const wrapper = mount(<Shelf {...mockProps} />);
        expect(wrapper.find('.loader-indicator').at(1).props().style.display).toBe('none');
    })
})