import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import hiddencar from '../../media/hiddencar.png';
import { fetchCars } from '../../slices/carsSlice'; // Make sure you import the fetchCars action
import './CarQuizApp.css';

const CarQuizApp = () => {
    const dispatch = useDispatch();
    const { cars, loading, error } = useSelector((state) => state.cars); // Accessing cars, loading, and error from Redux
    const [seatingCapacity, setSeatingCapacity] = useState(4);
    const [luggageSpace, setLuggageSpace] = useState('Medium');
    const [budget, setBudget] = useState(1000);
    const [result, setResult] = useState(null);
    const [isQuizVisible, setQuizVisible] = useState(true);

    // Dispatch the fetchCars action when the component mounts
    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    const handleBudgetChange = (e) => setBudget(Math.max(parseInt(e.target.value), 1000));

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const filteredCars = cars.filter(car =>
            car.rentalRate <= budget
        );
        setResult(filteredCars.length ? filteredCars[0] : findNearestCar(budget));
        setQuizVisible(false);
    };

    const findNearestCar = (budget) => {
        return cars.reduce((closest, car) =>
            Math.abs(car.rentalRate - budget) < Math.abs(closest.rentalRate - budget) ? car : closest,
            {} // Provide an initial empty object
        );
    };

    const handleRetake = () => {
        setQuizVisible(true);
        setResult(null);
    };

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
                            <label>How many people will the car need to seat?</label>
                            <select value={seatingCapacity} onChange={(e) => setSeatingCapacity(e.target.value)}>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
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
                            <input type="number" value={budget} onChange={handleBudgetChange} />
                        </div>
                        <button type="submit" className="car-quiz-submit">Get Recommended Car</button>
                    </form>
                </div>
            ) : (
                <div className="car-quiz-result">
                    {result ? (
                        <>

                            <h2>Recommended Car: {result.carName}</h2>
                            <img src={hiddencar} alt='carImage' className="car-quiz-result-image" />
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
