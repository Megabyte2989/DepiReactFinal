import React, { useState } from 'react';
import './CarGallerySection.css';

const CarGallerySection = ({ onBookNowClick }) => {
  const [cars] = useState([
    { make: 'Frany', model: 'Ad 2020 Dark Grey', year: 2020, img: '/media/ad 2020 dark grey (frany).png', seatingCapacity: 5, luggageSpace: '450L', price: 1500 },
    { make: 'BMW', model: '2016 Black', year: 2016, img: '/media/Bmw2016BLack.png', seatingCapacity: 5, luggageSpace: '500L', price: 1800 },
    { make: 'Kia', model: 'Cerato 2018 Black', year: 2018, img: '/media/cerato2018black.png', seatingCapacity: 5, luggageSpace: '450L', price: 1700 },
    { make: 'Elantra', model: 'White 2020', year: 2020, img: '/media/Elenetra white 2020.png', seatingCapacity: 5, luggageSpace: '470L', price: 1600 },
    { make: 'Elantra', model: '2021 Grey F3', year: 2021, img: '/media/Elentra 2021 Grey F3.png', seatingCapacity: 5, luggageSpace: '470L', price: 1750 },
    { make: 'Elantra', model: '2021 Pepsi', year: 2021, img: '/media/ELentra 2021 pepsi.png', seatingCapacity: 5, luggageSpace: '470L', price: 1800 },
    { make: 'Elantra', model: 'Ad 2017 Champagne', year: 2017, img: '/media/Elentra Ad 2017 champaigne.png', seatingCapacity: 5, luggageSpace: '470L', price: 1550 },
    { make: 'Elantra', model: 'CN7 F4', year: 2021, img: '/media/Elentra CN7 F4.png', seatingCapacity: 5, luggageSpace: '470L', price: 1900 },
    { make: 'Elantra', model: 'Md 2014 Frany', year: 2014, img: '/media/Elentra Md 2014 frany.png', seatingCapacity: 5, luggageSpace: '450L', price: 1400 },
    { make: 'Honda', model: 'Civic', year: 2020, img: '/media/Honda civic.png', seatingCapacity: 5, luggageSpace: '450L', price: 1600 },
    { make: 'Kia', model: 'Cerato 2018 K4', year: 2018, img: '/media/Kia  Cerato 2018 K4.png', seatingCapacity: 5, luggageSpace: '450L', price: 1700 },
    { make: 'Kia', model: 'Copet 2010', year: 2010, img: '/media/kia copet 2010.png', seatingCapacity: 5, luggageSpace: '400L', price: 1300 },
    { make: 'Kia', model: 'Grand Cerato', year: 2020, img: '/media/Kia Grand Cerato.png', seatingCapacity: 5, luggageSpace: '470L', price: 1850 },
    { make: 'Kia', model: 'K3 2015', year: 2015, img: '/media/Kia k3 2015.png', seatingCapacity: 5, luggageSpace: '450L', price: 1600 },
    { make: 'Lancer', model: 'Shark Rose', year: 2020, img: '/media/Lancer Shark rose.png', seatingCapacity: 5, luggageSpace: '450L', price: 1500 },
    { make: 'Kia', model: 'New Cerato', year: 2020, img: '/media/newcerato.png', seatingCapacity: 5, luggageSpace: '450L', price: 1550 },
    { make: 'Sportage', model: '2018', year: 2018, img: '/media/sportage2018.png', seatingCapacity: 5, luggageSpace: '480L', price: 1900 },
    { make: 'Toyota', model: '2020', year: 2020, img: '/media/Toyota 2020.png', seatingCapacity: 5, luggageSpace: '470L', price: 1800 },
    { make: 'Toyota', model: 'Corolla White 2021', year: 2021, img: '/media/Toyota Corolla White 2021.png', seatingCapacity: 5, luggageSpace: '470L', price: 1850 },
    { make: 'Tuscan', model: 'NX4', year: 2021, img: '/media/Tuscan Nx4 .png', seatingCapacity: 5, luggageSpace: '480L', price: 1900 },
    { make: 'Tuscan', model: 'Pepsi', year: 2021, img: '/media/tuscanpepsi.png', seatingCapacity: 5, luggageSpace: '480L', price: 1900 },
    { make: 'Tuscan', model: '2019 Grey 2', year: 2019, img: '/media/Tuscna 2019 grey 2.png', seatingCapacity: 5, luggageSpace: '480L', price: 1900 },
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
