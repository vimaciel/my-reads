import React from 'react';
import Search from '../components/Search'
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

describe('<Search />', () => {
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
            }
        }],
        searchText: 'react',
        moveBook: jest.fn(),
        searchTextChanged: jest.fn()
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
                <Search {...mockProps} />
            </MemoryRouter>
        );
        wrapper.find('li[data-key="read"]').simulate('click', mockedEvent);
        expect(mockProps.moveBook).toHaveBeenCalled();
    })

    it('Calls searchText when input search changes', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <Search {...mockProps} />
            </MemoryRouter>
        );

        const mockedEvent = {
            target: {
                value: 'a'
            }
        }

        wrapper.find('.search-books-input-wrapper input').simulate('change', mockedEvent);
        expect(mockProps.searchTextChanged).toHaveBeenCalled();
    })

    it('Check if search input element get value from searchText prop', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <Search {...mockProps} />
            </MemoryRouter>
        );

        expect(wrapper.find('.search-books-input-wrapper input').props().value).toBe(mockProps.searchText);
    })
})