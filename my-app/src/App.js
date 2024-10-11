
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Carspage from './admin_components/CarsBigPage';
import Dashboard from './admin_components/Dashboard';
import Errorcomp from './admin_components/Errorcomp';
import Layout from './admin_components/Layout';
import RentParent from './admin_components/RentParent';

import Maintain from './admin_components/Maintain';
import store from './redux/store';

// function App() {
//   // const [message, setMessage] = useState('');
//   // useEffect(() => {
//   //   axios.get("http://localhost:5000/")
//   //     .then((Response) => {
//   //       setMessage(Response.data)
//   //     })
//   //     .catch(err => {
//   //       console.log("Error fetching data from backend", err)
//   //     })
//   // })

//   // return (
//   //   <div>
//   //     <h1>Backend Response:</h1>
//   //     <p>{message}</p>
//   //   </div>
//   // );

//}


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>


          <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='/cars' element={<Carspage />} />
            <Route path='/maintenance' element={<Maintain />} />
            <Route path='/rents' element={<RentParent />} />
          </Route>
          <Route path="*" element={<Errorcomp />} />

        </Routes>

      </BrowserRouter>
    </Provider>
  );
}

export default App;
