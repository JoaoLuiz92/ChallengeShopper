var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// src/pages/RequestRide.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionamento
import Map from '../components/Map'; // Certifique-se de que o componente Map está funcionando corretamente
import axios from 'axios';
const RequestRide = () => {
    const [userId, setUserId] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [error, setError] = useState('');
    const [tripOptions, setTripOptions] = useState(null);
    // Hook de navegação para redirecionamento
    const navigate = useNavigate();
    // Função para enviar os dados para estimativa de viagem
    const handleSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        try {
            const response = yield axios.post('/api/ride/estimate', {
                userId,
                origin,
                destination,
            });
            setTripOptions(response.data);
        }
        catch (err) {
            setError('Erro ao estimar a viagem');
        }
    });
    // Função para redirecionar para a página de histórico
    const handleGoToHistory = () => {
        navigate('/historico');
    };
    // Definindo uma rota de exemplo para o mapa (você pode modificar conforme sua necessidade)
    const route = {
        start: [51.505, -0.09],
        end: [51.515, -0.1],
        path: [
            [51.505, -0.09],
            [51.515, -0.1]
        ]
    };
    return (React.createElement("div", null,
        React.createElement("h1", null, "Solicita\u00E7\u00E3o de Viagem"),
        React.createElement("form", { onSubmit: handleSubmit },
            React.createElement("input", { type: "text", placeholder: "ID do Usu\u00E1rio", value: userId, onChange: (e) => setUserId(e.target.value) }),
            React.createElement("input", { type: "text", placeholder: "Endere\u00E7o de Origem", value: origin, onChange: (e) => setOrigin(e.target.value) }),
            React.createElement("input", { type: "text", placeholder: "Endere\u00E7o de Destino", value: destination, onChange: (e) => setDestination(e.target.value) }),
            React.createElement("button", { type: "submit" }, "Estimar Viagem")),
        error && React.createElement("p", null, error),
        tripOptions && (React.createElement("div", null,
            React.createElement("h2", null, "Op\u00E7\u00F5es de Viagem"),
            React.createElement("ul", null, tripOptions.drivers.map((driver) => (React.createElement("li", { key: driver.id },
                React.createElement("p", null, driver.name),
                React.createElement("p", null, driver.description),
                React.createElement("p", null, driver.vehicle),
                React.createElement("p", null,
                    "Avalia\u00E7\u00E3o: ",
                    driver.rating),
                React.createElement("p", null,
                    "Pre\u00E7o: ",
                    driver.price),
                React.createElement("button", null, "Escolher"))))))),
        React.createElement(Map, { route: route }),
        React.createElement("button", { onClick: handleGoToHistory }, "Ir para Hist\u00F3rico")));
};
export default RequestRide;
