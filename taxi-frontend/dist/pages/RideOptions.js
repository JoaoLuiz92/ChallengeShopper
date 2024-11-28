// src/pages/RideOptions.tsx
import React from 'react';
import Map from '../components/Map'; // Importando o componente Map
const RideOptions = () => {
    const route = {
        start: [51.505, -0.09],
        end: [51.515, -0.1],
        path: [
            [51.505, -0.09],
            [51.515, -0.1]
        ]
    };
    return (React.createElement("div", null,
        React.createElement("h1", null, "Op\u00E7\u00F5es de Viagem"),
        React.createElement(Map, { route: route })));
};
export default RideOptions;
