// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RequestRide from './pages/RequestRide'; // Tela de Solicitação de Viagem
import TravelHistoryPage from './pages/TravelHistoryPage'; // Tela de Histórico de Viagens
const App = () => {
    return (React.createElement(Router, null,
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/", element: React.createElement(RequestRide, null) }),
            "  ",
            React.createElement(Route, { path: "/historico", element: React.createElement(TravelHistoryPage, null) }),
            "  ")));
};
export default App;
