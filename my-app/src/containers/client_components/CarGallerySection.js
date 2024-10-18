import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../slices/carsSlice'; // Import your fetchCars action
import './CarGallerySection.css';

const CarGallerySection = ({ onBookNowClick }) => {
  const dispatch = useDispatch();

  // Get the cars from the Redux store
  const { cars, loading, error } = useSelector((state) => state.cars);


  const [filteredCars, setFilteredCars] = useState([]);
  const [makeFilter, setMakeFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState(3500);
  const cloudinaryBaseUrl = 'https://res.cloudinary.com/dw6zenhpu/image/upload'; // Base URL

  // Fetch cars when the component mounts
  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  // Filter cars based on selected filters
  useEffect(() => {
    const filtered = cars.filter((car) => {
      const matchesMake = !makeFilter || car.brand === makeFilter;
      const matchesYear = !yearFilter || car.year.toString() === yearFilter;
      const matchesPrice = car.rentalRate <= priceFilter;
      return matchesMake && matchesYear && matchesPrice;
    });
    setFilteredCars(filtered);
  }, [cars, makeFilter, yearFilter, priceFilter]);




  const handleMakeChange = (e) => setMakeFilter(e.target.value);
  const handleYearChange = (e) => setYearFilter(e.target.value);
  const handlePriceChange = (e) => setPriceFilter(parseInt(e.target.value, 10));

  const handleClearFilters = () => {
    setMakeFilter('');
    setYearFilter('');
    setPriceFilter(3500);
  };

  return (
    <section className="car-gallery">
      <div className="container">
        {loading && <p>Loading cars...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && filteredCars.length === 0 && <p>No cars available.</p>}

        <div className="filters">
          {/* ... Filter inputs ... */}
        </div>

        <div className="grid" id="grid">
          {filteredCars.map((car, index) => (
            <div key={`${car.carId}-${index}`} className="grid-item">
              <img
                src={`${cloudinaryBaseUrl}/${car.imageUrl.startsWith('uploads/') ? car.imageUrl : `uploads/${car.imageUrl}`}`} // Check and adjust the image URL
                alt={car.carName}
              />
              <p><strong>{car.carName}</strong> ({car.brand})</p>
              <p>Year: {car.year}</p>
              <p>Rental Rate: ${car.rentalRate}</p>
              <button className="book-now-btn" onClick={() => onBookNowClick(car)}>Book Now</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CarGallerySection;
