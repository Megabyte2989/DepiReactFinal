import { fireEvent, render, screen } from '@testing-library/react';
import Cookies from 'js-cookie';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter for routing
import Navbar from './Navbar';

// Mock the Modal component
jest.mock('./Modal', () => ({ showModal, handleClose }) => (
    <div>
        {showModal && <div>Modal Content</div>}
        <button onClick={handleClose}>Close Modal</button>
    </div>
));

describe('Navbar Component', () => {
    beforeEach(() => {
        // Clear any existing cookies before each test
        Cookies.remove('authToken');
    });

    test('renders the navbar and menu items', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        // Check if the navbar elements are present
        expect(screen.getByAltText('Logo')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Quiz')).toBeInTheDocument();
        expect(screen.getByText('Gallery')).toBeInTheDocument();
        expect(screen.getByText('Contact us')).toBeInTheDocument();
        expect(screen.getByText('Sign In')).toBeInTheDocument();
        expect(screen.getByText('Join Us')).toBeInTheDocument();
    });

    test('shows modal when Contact us is clicked', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        // Click on the Contact Us button to open the modal
        fireEvent.click(screen.getByText('Contact us'));

        // Check if the modal content is displayed
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    test('closes modal when close button is clicked', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        // Open the modal
        fireEvent.click(screen.getByText('Contact us'));
        expect(screen.getByText('Modal Content')).toBeInTheDocument();

        // Close the modal
        fireEvent.click(screen.getByText('Close Modal'));

        // Check if the modal content is not displayed
        expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    test('logs in the user when auth token is present', () => {
        // Set a cookie to simulate a logged-in user
        Cookies.set('authToken', 'testToken');

        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        // Check if Logout is displayed instead of Login and Register
        expect(screen.getByText('Logout')).toBeInTheDocument();
        expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
        expect(screen.queryByText('Join Us')).not.toBeInTheDocument();
    });

    test('handles logout correctly', () => {
        // Set a cookie to simulate a logged-in user
        Cookies.set('authToken', 'testToken');

        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        // Click Logout
        fireEvent.click(screen.getByText('Logout'));

        // Check if the user is logged out (Logout should not be visible)
        expect(screen.queryByText('Logout')).not.toBeInTheDocument();
        expect(screen.getByText('Sign In')).toBeInTheDocument();
        expect(screen.getByText('Join Us')).toBeInTheDocument();
    });
});
