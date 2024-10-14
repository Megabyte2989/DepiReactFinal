// @ts-nocheck
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import RentTable from '../admin_components/RentTable.js'; // Update the import path as needed


const mockStore = configureStore([]);

global.scrollTo = jest.fn();

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => jest.fn(), // Mock useDispatch to return a jest function
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn().mockResolvedValue({ isConfirmed: true }), // Automatically confirms the dialog
}));

jest.mock('../slices/rentsSlice', () => ({
    fetchRents: jest.fn(),
    deleteRent: jest.fn(),
    updateRent: jest.fn(),
    updateRentStatus: jest.fn(),
}));

jest.mock('../slices/carsSlice', () => ({
    fetchCars: jest.fn(),
}));

describe('RentTable Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            rents: {
                rents: [
                    {
                        _id: '1',
                        customerName: 'John Doe',
                        nationalId: '1234567890',
                        carId: { model: 'Toyota' },
                        carPlate: 'ABC123',
                        rentDate: new Date(),
                        returnDate: new Date(),
                        kilosBeforeRent: 100,
                        totalPrice: 500,
                        paid: true,
                        status: 'ongoing',
                    },
                    {
                        _id: '2',
                        customerName: 'Jane Smith',
                        nationalId: '0987654321',
                        carId: { model: 'Honda' },
                        carPlate: 'XYZ456',
                        rentDate: new Date(),
                        returnDate: new Date(),
                        kilosBeforeRent: 150,
                        totalPrice: 600,
                        paid: false,
                        status: 'ongoing',
                    },
                ],
                loading: false,
                error: null,
            },
            cars: {
                cars: [
                    { _id: 'car1', model: 'Toyota', carName: 'Toyota Camry', carPlate: 'ABC123' },
                    { _id: 'car2', model: 'Honda', carName: 'Honda Accord', carPlate: 'XYZ456' },
                ],
            },
        });

        // Mock the dispatch function before each test
        store.dispatch = jest.fn();
    });

    test('renders RentTable with rents', () => {
        render(
            <Provider store={store}>
                <RentTable />
            </Provider>
        );

        expect(screen.getByPlaceholderText('🔍 Search Rents')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    test('handles search input', async () => {
        render(
            <Provider store={store}>
                <RentTable />
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('🔍 Search Rents'), { target: { value: 'John' } });

        expect(await screen.findByText('John Doe')).toBeInTheDocument();
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });

    test('handles sorting', () => {
        render(
            <Provider store={store}>
                <RentTable />
            </Provider>
        );

        // Simulate click to sort by customer name
        fireEvent.click(screen.getByText('Name'));

        // Check if sorting logic works as expected (you might need to check order)
        const rows = screen.getAllByRole('row');
        expect(rows[1]).toHaveTextContent('Jane Smith'); // Adjust the indexes as needed
        expect(rows[2]).toHaveTextContent('John Doe');
    });

    // test('handles deleting a rent', async () => {
    //     render(
    //         <Provider store={store}>
    //             <RentTable />
    //         </Provider>
    //     );

    //     // Click the delete button for the first rent entry
    //     fireEvent.click(screen.getAllByRole('button', { name: /delete/i })[0]);

    //     // Verify that Swal.fire was called
    //     expect(Swal.fire).toHaveBeenCalled();

    //     // Simulate confirming the deletion
    //     Swal.fire.mockImplementationOnce(() => Promise.resolve({ isConfirmed: true }));

    //     // Click the confirm button in the SweetAlert modal
    //     // Use `await screen.findByRole` to wait for the button in the modal to appear
    //     // const confirmButton = await screen.findByRole('button', { name: /yes, delete it!/i });
    //     // fireEvent.click(confirmButton);

    //     // Wait for the dispatch to be called
    //     // await waitFor(() => {
    //     //     expect(store.dispatch).toHaveBeenCalledWith(
    //     //         expect.objectContaining({ type: expect.stringContaining('deleteRent') })
    //     //     );
    //     // });
    // });



    test('handles loading state', () => {
        store = mockStore({
            rents: {
                rents: [],
                loading: true,
                error: null,
            },
            cars: {
                cars: [],
            },
        });

        render(
            <Provider store={store}>
                <RentTable />
            </Provider>
        );

        expect(screen.getByText('Loading rents...')).toBeInTheDocument();
    });

    test('handles error state', () => {
        store = mockStore({
            rents: {
                rents: [],
                loading: false,
                error: 'Failed to load rents',
            },
            cars: {
                cars: [],
            },
        });

        render(
            <Provider store={store}>
                <RentTable />
            </Provider>
        );

        expect(screen.getByText('Error: Failed to load rents')).toBeInTheDocument();
    });
});
