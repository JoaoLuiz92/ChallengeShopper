import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RequestRide from './pages/RequestRide';
import RideOptions from './pages/RideOptions';
import TravelHistoryPage from './pages/TravelHistoryPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RequestRide />} />
        <Route path="/ride-options" element={<RideOptions />} />
        <Route path="/history" element={<TravelHistoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
