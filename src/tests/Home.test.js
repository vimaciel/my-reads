import React from 'react';
import Home from '../components/Home'
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

describe('<Home />', () => {
    const mockProps = {
        books: [{
            id: '1',
            title: 'A Game of Thrones',
            publishedDate: '1996-08-01',
            authors: [
                'George R. R. Martin'
            ],
            imageLinks: {
                thumbnail: 'https://en.wikipedia.org/wiki/A_Game_of_Thrones#/media/File:AGameOfThrones.jpg'
            },
            shelf: 'wantToRead'
        }],
        searchText: 'react',
        moveBook: jest.fn(),
        searchTextChanged: jest.fn(),
        shelves: [
            {
                id: 'currentlyReading',
                title: 'Currently Reading',
            },
            {
                id: 'wantToRead',
                title: 'Want to Read',
            },
            {
                id: 'read',
                title: 'Read',
            }
        ],
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
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <Home {...mockProps} />
            </MemoryRouter>
        );

        wrapper.find('li[data-key="read"]').simulate('click', mockedEvent);
        expect(mockProps.moveBook).toHaveBeenCalled();
    })
})