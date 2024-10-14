import { render, screen } from '@testing-library/react';
import Home from './Home';

// Mock the child components
jest.mock('../client_components/Navbar', () => () => <div>Navbar</div>);
jest.mock('../client_components/Modal', () => () => <div>Modal</div>);
jest.mock('../client_components/HeroSection', () => () => <div>HeroSection</div>);
jest.mock('../client_components/HowItWorks', () => () => <div>HowItWorks</div>);
jest.mock('../client_components/BrandLogos', () => () => <div>BrandLogos</div>);
jest.mock('../client_components/AboutUs', () => () => <div>AboutUs</div>);
jest.mock('../client_components/BookNowSection', () => () => <div>BookNowSection</div>);
jest.mock('../client_components/FAQs', () => () => <div>FAQs</div>);
jest.mock('../client_components/Footer', () => () => <div>Footer</div>);
jest.mock('../client_components/FloatingIcon', () => () => <div>FloatingIcon</div>);

describe('Home Component', () => {
    test('renders all child components', () => {
        render(<Home />);

        // Check if all mocked components are rendered
        expect(screen.getByText('Navbar')).toBeInTheDocument();
        expect(screen.getByText('Modal')).toBeInTheDocument();
        expect(screen.getByText('HeroSection')).toBeInTheDocument();
        expect(screen.getByText('HowItWorks')).toBeInTheDocument();
        expect(screen.getByText('BrandLogos')).toBeInTheDocument();
        expect(screen.getByText('AboutUs')).toBeInTheDocument();
        expect(screen.getByText('BookNowSection')).toBeInTheDocument();
        expect(screen.getByText('FAQs')).toBeInTheDocument();
        expect(screen.getByText('Footer')).toBeInTheDocument();
        expect(screen.getByText('FloatingIcon')).toBeInTheDocument();
    });
});
