import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Cookies from 'js-cookie';
import { MemoryRouter } from 'react-router-dom';
import { loginApi } from './api/loginApi';
import Login from './Login';

// Mock the loginApi function
jest.mock('./api/loginApi');

describe('Login Component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear previous mock calls
    });

    test('renders login fields', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByLabelText(/Enter your email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByText(/Log In/i)).toBeInTheDocument();
    });

    test('shows error message when fields are empty', async () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText(/Log In/i));

        expect(await screen.findByText(/Both fields are required/i)).toBeInTheDocument();
    });

    test('logs in successfully and redirects', async () => {
        const mockResponse = {
            status: 200,
            data: {
                token: 'mockToken',
                user: {
                    firstName: 'John',
                    role: 'user',
                },
            },
        };

        loginApi.mockResolvedValue(mockResponse);

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Enter your email/i), {
            target: { value: 'john@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/Password/i), {
            target: { value: 'password123' },
        });

        fireEvent.click(screen.getByText(/Log In/i));

        await waitFor(() => {
            expect(Cookies.get('authToken')).toBe('mockToken');
            expect(screen.getByText(/Welcome back John/i)).toBeInTheDocument();
        });
    });

    test('shows warning message on API error', async () => {
        const mockResponse = {
            status: 400,
            data: {
                message: 'Invalid email or password',
            },
        };

        loginApi.mockResolvedValue(mockResponse);

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Enter your email/i), {
            target: { value: 'john@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/Password/i), {
            target: { value: 'wrongpassword' },
        });

        fireEvent.click(screen.getByText(/Log In/i));

        expect(await screen.findByText(/Invalid email or password/i)).toBeInTheDocument();
    });
});
