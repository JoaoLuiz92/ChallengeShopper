import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Map from '../components/Map';
import axios from 'axios';
import { RouteData, Driver } from '../types';
const RideOptions: React.FC = () => {
  const { state } = useLocation();
  const routeData: RouteData = state?.routeData || null;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Dados de routeData:", routeData);
  }, [routeData]);

  const handleConfirm = async (driver: Driver) => {
    if (!routeData) {
      console.error("Erro: Dados da rota não disponíveis");
      return;
    }   

    try {
      await axios.patch('http://localhost:3000/api/ride/confirm', {
        customer_id: routeData.customer_id,
        origin: routeData.origin,
        destination: routeData.destination,
        distance: routeData.distance,
        duration: routeData.duration,
        driver: { id: driver.id, name: driver.name },
        value: driver.value,
      });
      navigate('/history');
    } catch (error) {
      alert('Erro ao confirmar a viagem. Tente novamente.');
    }
  };

  if (!routeData) {
    return <p>Erro: Dados da rota não disponíveis.</p>;
  }

  return (
    <div>
      <h2>Opções de Viagem</h2>
      <Map route={routeData} />
            <ul>
        {routeData.options.map((driver) => (
          <li key={driver.id}>
            <p>
              <strong>Motorista:</strong> {driver.name} <br />
              <strong>Veículo:</strong> {driver.vehicle} <br />
              <strong>Avaliação:</strong> {driver.rating}/5 <br />
              <strong>Preço:</strong> R${driver.value.toFixed(2)}
            </p>
            <button onClick={() => handleConfirm(driver)}>Escolher</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RideOptions;
