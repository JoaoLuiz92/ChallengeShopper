import React, { useState } from 'react';
import axios from 'axios';

const TravelHistoryPage: React.FC = () => {
  const [customerId, setCustomerId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [error, setError] = useState('');

  const handleFetchHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/ride/${customerId}`, {
        params: { driver_id: driverId },
      });
      setHistory(response.data.rides);
    } catch (error) {
      setError('Erro ao carregar histórico.');
    }
  };

  return (
    <div>
      <h2>Histórico de Viagens</h2>
      <input 
        type="text" 
        placeholder="ID do Cliente" 
        value={customerId} 
        onChange={(e) => setCustomerId(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="ID do Motorista (opcional)" 
        value={driverId} 
        onChange={(e) => setDriverId(e.target.value)} 
      />
      <button onClick={handleFetchHistory}>Buscar Histórico</button>
      {error && <p>{error}</p>}
      <ul>
        {history.map((ride: any) => (
          <li key={ride.id}>
            <p>{ride.date}</p>
            <p>{ride.origin} → {ride.destination}</p>
            <p>{ride.driver ? ride.driver.name : 'Motorista desconhecido'}</p>
            <p>{ride.distance} | {ride.duration}</p>
            <p>R$ {isNaN(ride.value) ? 'Valor inválido' : parseFloat(ride.value).toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TravelHistoryPage;
