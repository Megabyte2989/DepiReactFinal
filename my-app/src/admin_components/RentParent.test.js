import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store'; // Adjust the import if necessary
import RentParent from './RentParent';

// Mock the RentForm and RentTable components
jest.mock('./RentForm', () => () => <div>Rent Form</div>);
jest.mock('./RentTable', () => () => <div>Rent Table</div>);

describe('RentParent Component', () => {
    it('renders RentTable and RentForm components', () => {
        const { getByText } = render(
            <Provider store={store}>
                <RentParent />
            </Provider>
        );

        // Check if RentForm and RentTable are rendered
        expect(getByText('Rent Form')).toBeInTheDocument();
        expect(getByText('Rent Table')).toBeInTheDocument();
    });

    it('renders the MainSection container', () => {
        const { container } = render(
            <Provider store={store}>
                <RentParent />
            </Provider>
        );

        // Check if the MainSection is present
        const mainSection = container.querySelector('#MainSection');
        expect(mainSection).toBeInTheDocument();
    });
});
