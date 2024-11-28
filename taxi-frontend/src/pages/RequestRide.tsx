import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RequestRide: React.FC = () => {
  const [customerId, setCustomerId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/ride/estimate', {
        customer_id: customerId,
        origin,
        destination,
      });

      const routeData = response.data;
      navigate('/ride-options', {
        state: { routeData },
      });
    } catch (error) {
      console.error('Erro ao estimar a viagem:', error);
      alert('Erro ao estimar a viagem. Tente novamente.');
    }
  };

  return (
    <div>
      <h2>Solicitar Viagem</h2>
      <div>
        <label>ID do Cliente:</label>
        <input
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
      </div>
      <div>
        <label>Origem:</label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
      </div>
      <div>
        <label>Destino:</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Estimar Viagem</button>
    </div>
  );
};

export default RequestRide;
