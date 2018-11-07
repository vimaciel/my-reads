import React from 'react';
import Search from '../components/Search'
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import * as sinon from 'sinon';

describe('<Search />', () => {
    let clock = sinon.useFakeTimers();
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
        searchTextChanged: jest.fn(),
        loadingSearchBooks: false
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
        wrapper.find('#read').at(1).simulate('click', mockedEvent);
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
                value: 'React'
            }
        }

        wrapper.find('.search-books-input-wrapper input').simulate('change', mockedEvent);

        // https://stackoverflow.com/a/52226973
        // https://sinonjs.org/releases/v6.2.0/fake-timers/
        clock.tick(1000);

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

    it('Check if loading indicator shows when loadingBooks set to true', () => {
        mockProps.loadingSearchBooks = true;
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <Search {...mockProps} />
            </MemoryRouter>
        );

        expect(wrapper.find('.loader-search-indicator').at(1).props().style.display).toBe('block');
    })

    it('Check if loading indicator hides when loadingBooks set to false', () => {
        mockProps.loadingSearchBooks = false;
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <Search {...mockProps} />
            </MemoryRouter>
        );

        expect(wrapper.find('.loader-search-indicator').at(1).props().style.display).toBe('none');
    })
})