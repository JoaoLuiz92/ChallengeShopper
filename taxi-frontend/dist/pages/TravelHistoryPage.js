// src/pages/TravelHistoryPage.tsx
import React, { useState } from 'react';
const TravelHistoryPage = () => {
    const [history, setHistory] = useState([
        // Exemplo de dados de histórico
        {
            id: 1,
            date: '2024-11-01 10:00',
            driver: 'Homer Simpson',
            origin: 'Rua 1',
            destination: 'Rua 2',
            distance: '10 km',
            duration: '20 min',
            value: 'R$ 25,00',
        },
        {
            id: 2,
            date: '2024-11-01 11:30',
            driver: 'James Bond',
            origin: 'Rua 3',
            destination: 'Rua 4',
            distance: '15 km',
            duration: '30 min',
            value: 'R$ 45,00',
        },
    ]);
    return (React.createElement("div", null,
        React.createElement("h1", null, "Hist\u00F3rico de Viagens"),
        React.createElement("ul", null, history.map((ride) => (React.createElement("li", { key: ride.id },
            React.createElement("p", null,
                "Data: ",
                ride.date),
            React.createElement("p", null,
                "Motorista: ",
                ride.driver),
            React.createElement("p", null,
                "Origem: ",
                ride.origin),
            React.createElement("p", null,
                "Destino: ",
                ride.destination),
            React.createElement("p", null,
                "Dist\u00E2ncia: ",
                ride.distance),
            React.createElement("p", null,
                "Dura\u00E7\u00E3o: ",
                ride.duration),
            React.createElement("p", null,
                "Valor: ",
                ride.value)))))));
};
export default TravelHistoryPage;
