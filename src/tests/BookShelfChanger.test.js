import React from 'react';
import BookShelfChanger from '../components/BookShelfChanger'
import { shallow } from 'enzyme';

describe('<BookShelfChanger />', () => {
    const mockProps = {
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

    it('Calls moveBook function when list item is clicked', () => {
        const wrapper = shallow(<BookShelfChanger {...mockProps} />);
        wrapper.find('#read').simulate('click', mockedEvent);
        expect(mockProps.moveBook).toHaveBeenCalled();
    })

    it('Do not call moveBook function when item is selected', () => {
        const wrapper = shallow(<BookShelfChanger {...mockProps} />);

        const items = wrapper.state('items').map(item => {
            if(item.id === 'currentlyReading'){
                item.selected = true;
            }

            return item;
        })

        wrapper.setState({
            items
        })

        wrapper.find('#currentlyReading').simulate('click', mockedEvent);
        expect(mockProps.moveBook).toHaveBeenCalledWith('read');
    })
})