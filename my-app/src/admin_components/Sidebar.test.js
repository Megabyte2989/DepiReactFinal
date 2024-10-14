import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useLogout } from '../login&register/customHooks/useLogout';
import Sidebar from './Sidebar';

// Mock the useLogout hook
jest.mock('../login&register/customHooks/useLogout', () => ({
    useLogout: jest.fn(),
}));

describe('Sidebar', () => {
    const logoutMock = jest.fn();

    beforeEach(() => {
        // Clear the mock before each test
        useLogout.mockReturnValue(logoutMock);
    });

    test('renders sidebar and links', () => {
        render(
            <MemoryRouter initialEntries={['/dashboard']}>
                <Sidebar />
            </MemoryRouter>
        );

        expect(screen.getByText(/Ramy Rent/i)).toBeInTheDocument();
        expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
        expect(screen.getByText(/Cars/i)).toBeInTheDocument();
        expect(screen.getByText(/Rents/i)).toBeInTheDocument();
        expect(screen.getByText(/Maintain/i)).toBeInTheDocument();
    });

    test('applies active class based on current location', () => {
        render(
            <MemoryRouter initialEntries={['/dashboard/cars']}>
                <Sidebar />
            </MemoryRouter>
        );

        const carsItem = screen.getByText(/Cars/i).closest('li');
        const dashboardItem = screen.getByText(/Dashboard/i).closest('li');

        expect(carsItem).toHaveClass('active');
        expect(dashboardItem).not.toHaveClass('active');
    });

    test('calls logout function when Logout is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/dashboard']}>
                <Sidebar />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText(/Logout/i));
        expect(logoutMock).toHaveBeenCalled();
    });
});
