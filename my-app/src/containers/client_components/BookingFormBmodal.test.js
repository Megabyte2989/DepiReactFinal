import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import BookingFormBmodal from './BookingFormModal.js';

describe('BookingFormBmodal', () => {
    const handleCloseMock = jest.fn();

    beforeEach(() => {
        // Clear the mock before each test
        handleCloseMock.mockClear();
    });

    test('does not render when isOpen is false', () => {
        render(<BookingFormBmodal isOpen={false} handleCloseBmodal={handleCloseMock} />);
        expect(screen.queryByText(/Book Your Car/i)).not.toBeInTheDocument();
    });

    test('renders correctly when isOpen is true', () => {
        render(<BookingFormBmodal isOpen={true} handleCloseBmodal={handleCloseMock} />);
        expect(screen.getByText(/Book Your Car/i)).toBeInTheDocument();
    });

    test('closes the modal when the close button is clicked', () => {
        render(<BookingFormBmodal isOpen={true} handleCloseBmodal={handleCloseMock} />);
        fireEvent.click(screen.getByText('×')); // Clicking the close button
        expect(handleCloseMock).toHaveBeenCalled();
    });

    test('shows an alert and closes the modal on form submission', () => {
        // Mock the window.alert to prevent actual alert dialog
        window.alert = jest.fn();

        render(<BookingFormBmodal isOpen={true} handleCloseBmodal={handleCloseMock} />);

        // Fill the form and submit
        fireEvent.change(screen.getByLabelText(/Pickup Date:/i), { target: { value: '2024-10-14' } });
        fireEvent.change(screen.getByLabelText(/Pickup Time:/i), { target: { value: '10:00' } });
        fireEvent.change(screen.getByLabelText(/Drop-off Date:/i), { target: { value: '2024-10-15' } });
        fireEvent.change(screen.getByLabelText(/Drop-off Time:/i), { target: { value: '18:00' } });
        fireEvent.change(screen.getByLabelText(/Location:/i), { target: { value: 'Main St. Garage' } });

        fireEvent.click(screen.getByText(/Book Now/i));

        // Check that the alert was called and the modal was closed
        expect(window.alert).toHaveBeenCalledWith('Thank you! Your booking has been received.');
        expect(handleCloseMock).toHaveBeenCalled();
    });
});
