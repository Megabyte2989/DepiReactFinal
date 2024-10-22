// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../slices/carsSlice';
import './CarQuizApp.css';

const cloudinaryBaseUrl = 'https://res.cloudinary.com/dw6zenhpu/image/upload'; // Replace with your base Cloudinary URL

const CarQuizApp = () => {
  const dispatch = useDispatch();
  const { cars, loading, error } = useSelector((state) => state.cars);

  const [makeFilter, setMakeFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [seatingCapacity, setSeatingCapacity] = useState(4);
  const [luggageSpace, setLuggageSpace] = useState('Medium');
  const [budget, setBudget] = useState(1000);
  const [result, setResult] = useState(null);
  const [isQuizVisible, setQuizVisible] = useState(true);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleBudgetChange = (e) => setBudget(Math.max(parseInt(e.target.value), 1000));

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const filteredCars = cars.filter((car) => {
      const matchesMake = !makeFilter || car.brand === makeFilter;
      const matchesYear = !yearFilter || car.year.toString() === yearFilter;
      const matchesSeating = car.seatingCapacity >= seatingCapacity;
      const matchesLuggage = car.luggageSpace === luggageSpace;
      const matchesBudget = car.rentalRate <= budget;

      return matchesMake && matchesYear && matchesSeating && matchesLuggage && matchesBudget;
    });

    setResult(filteredCars.length ? filteredCars[0] : findNearestCar(budget));
    setQuizVisible(false);
  };

  const findNearestCar = (budget) => {
    return cars.length
      ? cars.reduce((closest, car) =>
          Math.abs(car.rentalRate - budget) < Math.abs(closest.rentalRate - budget) ? car : closest,
        cars[0])
      : null; // Fallback if no cars available
  };

  const handleRetake = () => {
    setQuizVisible(true);
    setResult(null);
  };

  const handleMakeChange = (e) => setMakeFilter(e.target.value);
  const handleYearChange = (e) => setYearFilter(e.target.value);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="car-quiz-container">
      {isQuizVisible ? (
        <div className="car-quiz-form">
          <h1 className="car-quiz-title">Car Recommendation Quiz</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="car-quiz-question">
              <label>Select car make:</label>
              <select value={makeFilter} onChange={handleMakeChange}>
                <option value="">Any</option>
                {Array.from(new Set(cars.map(car => car.brand))).map((make, index) => (
                  <option key={index} value={make}>{make}</option>
                ))}
              </select>
            </div>

            <div className="car-quiz-question">
              <label>Select car year:</label>
              <select value={yearFilter} onChange={handleYearChange}>
                <option value="">Any</option>
                {Array.from(new Set(cars.map(car => car.year))).map((year, index) => (
                  <option key={index} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div className="car-quiz-question">
              <label>How many people will the car need to seat?</label>
              <select value={seatingCapacity} onChange={(e) => setSeatingCapacity(e.target.value)}>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={7}>7</option>
              </select>
            </div>

            <div className="car-quiz-question">
              <label>How much luggage space do you need?</label>
              <select value={luggageSpace} onChange={(e) => setLuggageSpace(e.target.value)}>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>

            <div className="car-quiz-question">
              <label>What is your budget?</label>
              <input type="number" value={budget} onChange={handleBudgetChange} min="1000" className='quizInput' />
            </div>

            <button type="submit" className="car-quiz-submit">Get Recommended Car</button>
          </form>
        </div>
      ) : (
        <div className="car-quiz-result">
          {result ? (
            <>
              <h2>Recommended Car: <br></br> {result.carName}</h2>
              <img
                src={`${cloudinaryBaseUrl}/${result.imageUrl.startsWith('uploads/') ? result.imageUrl : `uploads/${result.imageUrl}`}`}
                alt={result.carName}
                className="car-quiz-result-image"
              />
              <p>Model: {result.model}</p>
              <p>Year: {result.year}</p>
              <p>Price: {result.rentalRate} L.E.</p>
            </>
          ) : (
            <p>No car found within the specified budget.</p>
          )}
          <button onClick={handleRetake} className="car-quiz-retake">Retake Quiz</button>
        </div>
      )}
    </div>
  );
};

export default CarQuizApp;