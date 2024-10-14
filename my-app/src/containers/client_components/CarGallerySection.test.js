// CarGallerySection.test.js
import { render, screen } from '@testing-library/react';
import React from 'react';
import CarGallerySection from './CarGallerySection';

// Mock the image imports to avoid import errors during testing
jest.mock('../../media/ad 2020 dark grey (frany).png', () => 'mockedImage');
jest.mock('../../media/Bmw2016BLack.png', () => 'mockedImage');
jest.mock('../../media/cerato2018black.png', () => 'mockedImage');
jest.mock('../../media/Elenetra white 2020.png', () => 'mockedImage');
jest.mock('../../media/Elentra 2021 Grey F3.png', () => 'mockedImage');
jest.mock('../../media/ELentra 2021 pepsi.png', () => 'mockedImage');
jest.mock('../../media/Elentra Ad 2017 champaigne.png', () => 'mockedImage');
jest.mock('../../media/Elentra CN7 F4.png', () => 'mockedImage');
jest.mock('../../media/Elentra Md 2014 frany.png', () => 'mockedImage');
jest.mock('../../media/Honda civic.png', () => 'mockedImage');
jest.mock('../../media/Kia  Cerato 2018 K4.png', () => 'mockedImage');
jest.mock('../../media/kia copet 2010.png', () => 'mockedImage');
jest.mock('../../media/Kia Grand Cerato.png', () => 'mockedImage');
jest.mock('../../media/Kia k3 2015.png', () => 'mockedImage');
jest.mock('../../media/Lancer Shark rose.png', () => 'mockedImage');
jest.mock('../../media/newcerato.png', () => 'mockedImage');
jest.mock('../../media/sportage2018.png', () => 'mockedImage');
jest.mock('../../media/Toyota 2020.png', () => 'mockedImage');
jest.mock('../../media/Toyota Corolla White 2021.png', () => 'mockedImage');
jest.mock('../../media/Tuscan Nx4 .png', () => 'mockedImage');
jest.mock('../../media/tuscanpepsi.png', () => 'mockedImage');
jest.mock('../../media/Tuscna 2019 grey 2.png', () => 'mockedImage');

describe('CarGallerySection', () => {
    const onBookNowClickMock = jest.fn();

    beforeEach(() => {
        render(<CarGallerySection onBookNowClick={onBookNowClickMock} />);
    });

    test('renders the car gallery section with cars', () => {
        // Check if the component renders with initial cars
        const carElements = screen.getAllByText(/Year:/);
    });

});
