import React from 'react';
import Book from '../components/Book'
import { shallow, mount } from 'enzyme';

describe('<Book />', () => {   
    const mockProps = {
        book: {
            title: 'A Game of Thrones',
            publishedDate: '1996-08-01',
            authors: [
                'George R. R. Martin'
            ],
            imageLinks: {
                thumbnail: 'https://en.wikipedia.org/wiki/A_Game_of_Thrones#/media/File:AGameOfThrones.jpg'
            }
        },
        moveBook: jest.fn(),
    }

    const mockedEvent = {
        target: {
            dataset: {
                key: 'read'
            }
        }
    }

    it('Calls moveBook function when item to move the book is clicked', () => {
        const wrapper = mount(<Book {...mockProps} />);
        wrapper.find('#read').at(1).props().onClick(mockedEvent);
        expect(mockProps.moveBook).toHaveBeenCalled();
    })
})