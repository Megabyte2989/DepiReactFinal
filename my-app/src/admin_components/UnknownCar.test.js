import { render, screen } from '@testing-library/react';
import React from 'react';
import UnknownCar from './UnknownCar.js'; // Adjust the import based on your file structure

describe('UnknownCar Component', () => {
    test('renders UnknownCar component with image and button', () => {
        render(<UnknownCar />); // Render the component

        // Check if the image is rendered
        const imageElement = screen.getByAltText(/Add a new car/i);
        expect(imageElement).toBeInTheDocument(); // Check if image is in the document

        // Check if the button to add a car is rendered
        const addCarButton = screen.getByText(/Add Car/i);
        expect(addCarButton).toBeInTheDocument(); // Check if button is in the document
    });

    test('has the correct image source', () => {
        render(<UnknownCar />); // Render the component

        // Check if the image has the correct src
        const imageElement = screen.getByAltText(/Add a new car/i);
        expect(imageElement).toHaveAttribute('src', expect.stringContaining('UnknownCar.png')); // Adjust according to the actual path
    });
});
