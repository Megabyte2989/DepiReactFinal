import React, { useState } from 'react';
import './CarGallerySection.css';

import img16 from '/media/ad 2020 dark grey (frany).png';
import img19 from '/media/Bmw2016BLack.png';
import img13 from '/media/cerato2018black.png';
import img6 from '/media/Elenetra white 2020.png';
import img7 from '/media/Elentra 2021 Grey F3.png';
import img10 from '/media/ELentra 2021 pepsi.png';
import img12 from '/media/Elentra Ad 2017 champaigne.png';
import img1 from '/media/Elentra CN7 F4.png';
import img4 from '/media/Elentra Md 2014 frany.png';
import img3 from '/media/Honda civic.png';
import img20 from '/media/Kia  Cerato 2018 K4.png';
import img2 from '/media/kia copet 2010.png';
import img5 from '/media/Kia Grand Cerato.png';
import img11 from '/media/Kia k3 2015.png';
import img14 from '/media/Lancer Shark rose.png';
import img15 from '/media/newcerato.png';
import img17 from '/media/sportage2018.png';
import img18 from '/media/Toyota 2020.png';
import img22 from '/media/Toyota Corolla White 2021.png';
import img8 from '/media/Tuscan Nx4 .png';
import img9 from '/media/tuscanpepsi.png';
import img21 from '/media/Tuscna 2019 grey 2.png';

const CarGallerySection = ({ onBookNowClick }) => {
  const [cars] = useState([
    { make: 'Hyundai', model: 'Cn7 f4', year: 2021, seatingCapacity: 5, luggageSpace: 'Medium', price: 1800, img: img1 },
    { make: 'Kia', model: 'Kia cop', year: 2010, seatingCapacity: 4, luggageSpace: 'Small', price: 1000, img: img2 },
    { make: 'Honda', model: 'Honda civic', year: 2009, seatingCapacity: 5, luggageSpace: 'Medium', price: 1000, img: img3 },
    { make: 'Hyundai', model: 'Elantra md', year: 2014, seatingCapacity: 5, luggageSpace: 'Medium', price: 1200, img: img4 },
    { make: 'Kia', model: 'Grand cerato', year: 2019, seatingCapacity: 5, luggageSpace: 'Large', price: 1400, img: img5 },
    { make: 'Hyundai', model: 'Elantra AD white', year: 2019, seatingCapacity: 5, luggageSpace: 'Medium', price: 1600, img: img6 },
    { make: 'Hyundai', model: 'Elantra Cn7 f3', year: 2021, seatingCapacity: 5, luggageSpace: 'Medium', price: 1800, img: img7 },
    { make: 'Hyundai', model: 'Tousan nx4', year: 2021, seatingCapacity: 5, luggageSpace: 'Large', price: 2000, img: img8 },
    { make: 'Hyundai', model: 'Tousan 2019 zahry', year: 2019, seatingCapacity: 5, luggageSpace: 'Large', price: 2000, img: img9 },
    { make: 'Hyundai', model: 'Elantra Cn7 pepsi', year: 2021, seatingCapacity: 5, luggageSpace: 'Medium', price: 1800, img: img10 },
    { make: 'Kia', model: 'Kia cerato k3', year: 2014, seatingCapacity: 5, luggageSpace: 'Medium', price: 1200, img: img11 },
    { make: 'Hyundai', model: 'Elantra AD', year: 2017, seatingCapacity: 5, luggageSpace: 'Medium', price: 1500, img: img12 },
    { make: 'Kia', model: 'Cerato', year: 2018, seatingCapacity: 5, luggageSpace: 'Medium', price: 1200, img: img13 },
    { make: 'Mitsubishi', model: 'Lancer shark', year: 2015, seatingCapacity: 5, luggageSpace: 'Small', price: 1200, img: img14 },
    { make: 'Kia', model: 'new cerato', year: 2018, seatingCapacity: 5, luggageSpace: 'Medium', price: 1200, img: img15 },
    { make: 'Hyundai', model: 'Elantra 2020 frany', year: 2020, seatingCapacity: 5, luggageSpace: 'Medium', price: 1600, img: img16 },
    { make: 'Kia', model: 'Kia Sportage', year: 2020, seatingCapacity: 5, luggageSpace: 'Large', price: 2000, img: img17 },
    { make: 'Toyota', model: 'Toyota', year: 2020, seatingCapacity: 5, luggageSpace: 'Medium', price: 1800, img: img18 },
    { make: 'BMW', model: 'BMW', year: 2016, seatingCapacity: 5, luggageSpace: 'Large', price: 3500, img: img19 },
    { make: 'Kia', model: 'Cerato 2018 black', year: 2018, seatingCapacity: 5, luggageSpace: 'Medium', price: 1200, img: img20 },
    { make: 'Hyundai', model: 'Tousan 2019 gray', year: 2019, seatingCapacity: 5, luggageSpace: 'Large', price: 2000, img: img21 },
    { make: 'Toyota', model: 'Toyota', year: 2021, seatingCapacity: 5, luggageSpace: 'Medium', price: 1800, img: img22 }
  ]);


  const [filteredCars, setFilteredCars] = useState(cars);
  const [makeFilter, setMakeFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState(3500);

  const handleMakeChange = e => setMakeFilter(e.target.value);
  const handleYearChange = e => setYearFilter(e.target.value);
  const handlePriceChange = e => setPriceFilter(parseInt(e.target.value, 10));

  const handleApplyFilters = () => {
    const filtered = cars.filter(car => {
      const matchesMake = makeFilter === '' || car.make === makeFilter;
      const matchesYear = yearFilter === '' || car.year.toString() === yearFilter;
      const matchesPrice = car.price <= priceFilter;
      return matchesMake && matchesYear && matchesPrice;
    });
    setFilteredCars(filtered);
  };

  const handleClearFilters = () => {
    setMakeFilter('');
    setYearFilter('');
    setPriceFilter(3500);
    setFilteredCars(cars);
  };

  return (
    <section className="car-gallery">
      <div className="container">
        <div className="filters">
          {/* Car Type Filter */}
          <div className="filter-group">
            <label htmlFor="make">Car Type:</label>
            <select id="make" value={makeFilter} onChange={handleMakeChange}>
              <option value="">All</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
              <option value="Kia">Kia</option>
              <option value="Mitsubishi">Mitsubishi</option>
              <option value="BMW">BMW</option>
              <option value="Hyundai">Hyundai</option>
            </select>
          </div>

          {/* Year Filter */}
          <div className="filter-group">
            <label htmlFor="year">Year:</label>
            <select id="year" value={yearFilter} onChange={handleYearChange}>
              <option value="">All</option>
              <option value="2009">2009</option>
              <option value="2010">2010</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
            </select>
          </div>

          {/* Price Filter */}
          <div className="filter-group">
            <label htmlFor="price">Price:</label>
            <div className="price-slider">
              <input
                type="range"
                id="price-slider"
                min="1000"
                max="3500"
                value={priceFilter}
                onChange={handlePriceChange}
              />
              <span id="price-value">${priceFilter}</span>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="filter-buttons">
            <button className="filterbtn apply-filters-btn" onClick={handleApplyFilters}>Apply Filters</button>
            <button className="filterbtn clear-filters-btn" onClick={handleClearFilters}>Clear Filters</button>
          </div>
        </div>

        {/* Car Grid */}
        <div className="grid" id="grid">
          {filteredCars.map((car, index) => (
            <div key={`${car.make}-${car.model}-${index}`} className="grid-item">
              <img src={car.img} alt={car.make} />
              <p><strong>{car.make}</strong></p>
              <p>Year: {car.year}</p>
              <p>Price: ${car.price}</p>
              <button className="book-now-btn" onClick={onBookNowClick} type="submit">Book Now</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarGallerySection;
