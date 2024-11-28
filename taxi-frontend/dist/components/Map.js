import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const Map = ({ route }) => {
    // Verifique o conteúdo da route
    console.log(route);
    return (React.createElement("div", null,
        React.createElement("h2", null, "Mapa da Viagem"),
        React.createElement(MapContainer, { center: route.start, zoom: 13, style: { height: '400px', width: '100%' } },
            React.createElement(TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }),
            React.createElement(Marker, { position: route.start }),
            React.createElement(Marker, { position: route.end }),
            React.createElement(Polyline, { positions: route.path }))));
};
export default Map;
