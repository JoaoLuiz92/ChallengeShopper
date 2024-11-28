import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
//import { LatLngExpression } from 'leaflet';
import {RouteData } from '../types'


interface MapProps {
  route: RouteData;
}

const Map: React.FC<MapProps> = ({ route }) => {
  if (!route.start || !route.end || !route.path || route.path.length === 0) {
    return <p>Erro: Dados da rota estão incompletos.</p>;
  }

  return (
    <MapContainer center={route.start} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={route.start} />
      <Marker position={route.end} />
      <Polyline positions={route.path} />
    </MapContainer>
  );
};

export default Map;
