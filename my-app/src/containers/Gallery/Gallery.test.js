import { fireEvent, render, screen } from '@testing-library/react';
import Gallery from './Gallery';

// Mock the child components
jest.mock('../client_components/NavbarDark', () => () => <div>NavbarDark</div>);
jest.mock('../client_components/GalleryHero', () => () => <div>GalleryHero</div>);
jest.mock('../client_components/CarGallerySection', () => ({ onBookNowClick }) => (
    <div>
        <button onClick={onBookNowClick}>Book Now</button>
    </div>
));
jest.mock('../client_components/Footer', () => () => <div>Footer</div>);
jest.mock('../client_components/FloatingIcon', () => () => <div>FloatingIcon</div>);
jest.mock('../client_components/BookingFormModal', () => ({ isOpen, handleCloseBmodal }) => (
    <div>
        {isOpen ? <div>BookingFormModal</div> : null}
        <button onClick={handleCloseBmodal}>Close Modal</button>
    </div>
));

describe('Gallery Component', () => {
    test('renders all child components', () => {
        render(<Gallery />);

        // Check if all mocked components are rendered
        expect(screen.getByText('NavbarDark')).toBeInTheDocument();
        expect(screen.getByText('GalleryHero')).toBeInTheDocument();
        expect(screen.getByText('Footer')).toBeInTheDocument();
        expect(screen.getByText('FloatingIcon')).toBeInTheDocument();
    });

    test('opens and closes the BookingFormBmodal', () => {
        render(<Gallery />);

        // Initially, the modal should not be rendered
        expect(screen.queryByText('BookingFormModal')).not.toBeInTheDocument();

        // Click the "Book Now" button to open the modal
        fireEvent.click(screen.getByText('Book Now'));

        // Now, the modal should be rendered
        expect(screen.getByText('BookingFormModal')).toBeInTheDocument();

        // Click the "Close Modal" button to close the modal
        fireEvent.click(screen.getByText('Close Modal'));

        // The modal should no longer be rendered
        expect(screen.queryByText('BookingFormModal')).not.toBeInTheDocument();
    });
});
