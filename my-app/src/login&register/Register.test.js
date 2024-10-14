import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from './Register'; // Adjust the import path as necessary

describe('Register Component', () => {
    test('renders register form and submits data', () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        // Find and interact with input fields
        fireEvent.change(screen.getByLabelText(/Enter your first name/i), {
            target: { value: 'John' },
        });
        fireEvent.change(screen.getByLabelText(/Enter your last name/i), {
            target: { value: 'Doe' },
        });
        fireEvent.change(screen.getByLabelText(/Enter your email/i), {
            target: { value: 'john.doe@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/Enter your password/i), {
            target: { value: 'Password@123' },
        });
        fireEvent.change(screen.getByLabelText(/Confirm your password/i), {
            target: { value: 'Password@123' },
        });

        // Click the submit button
        fireEvent.click(screen.getByText(/Log In/i));

    });
});
