import React, { useState } from 'react';
import axios from 'axios';

interface Driver {
  id: string;
  name: string;
  value: number;
}

const RideEstimator: React.FC = () => {
  const [customerId, setCustomerId] = useState<string>('');
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [error, setError] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false);

  const handleEstimate = async (): Promise<void> => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/api/ride/estimate', {
        customer_id: customerId,
        origin,
        destination,
      });

      setDrivers(response.data.options as Driver[]); 
    } catch (err) {
      setError('Erro ao calcular a viagem. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Estimativa de Viagem</h2>
      <div>
        <label>Cliente ID: </label>
        <input
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
      </div>
      <div>
        <label>Origem: </label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
      </div>
      <div>
        <label>Destino: </label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <button onClick={handleEstimate} disabled={loading}>
        {loading ? 'Carregando...' : 'Estimar Viagem'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {drivers.length > 0 && (
        <div>
          <h3>Motoristas Disponíveis:</h3>
          <ul>
            {drivers.map((driver) => (
              <li key={driver.id}>
                <strong>{driver.name}</strong> - R$ {driver.value.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RideEstimator;
