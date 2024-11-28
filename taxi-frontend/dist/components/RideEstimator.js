var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from 'react';
import axios from 'axios';
// Componente de Estimativa de Viagem
const RideEstimator = () => {
    const [customerId, setCustomerId] = useState(''); // ID do cliente
    const [origin, setOrigin] = useState(''); // Origem da viagem
    const [destination, setDestination] = useState(''); // Destino da viagem
    const [drivers, setDrivers] = useState([]); // Lista de motoristas
    const [error, setError] = useState(''); // Erro, se ocorrer
    const [loading, setLoading] = useState(false); // Indicador de carregamento
    const handleEstimate = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        setError('');
        try {
            const response = yield axios.post('http://localhost:3000/ride/estimate', {
                customer_id: customerId,
                origin,
                destination,
            });
            // Garantir que os dados da resposta estão no formato correto
            setDrivers(response.data.options); // Tipando a resposta como um array de Driver
        }
        catch (err) {
            setError('Erro ao calcular a viagem. Tente novamente.');
        }
        finally {
            setLoading(false);
        }
    });
    return (React.createElement("div", null,
        React.createElement("h2", null, "Estimativa de Viagem"),
        React.createElement("div", null,
            React.createElement("label", null, "Cliente ID: "),
            React.createElement("input", { type: "text", value: customerId, onChange: (e) => setCustomerId(e.target.value) })),
        React.createElement("div", null,
            React.createElement("label", null, "Origem: "),
            React.createElement("input", { type: "text", value: origin, onChange: (e) => setOrigin(e.target.value) })),
        React.createElement("div", null,
            React.createElement("label", null, "Destino: "),
            React.createElement("input", { type: "text", value: destination, onChange: (e) => setDestination(e.target.value) })),
        React.createElement("button", { onClick: handleEstimate, disabled: loading }, loading ? 'Carregando...' : 'Estimar Viagem'),
        error && React.createElement("p", { style: { color: 'red' } }, error),
        drivers.length > 0 && (React.createElement("div", null,
            React.createElement("h3", null, "Motoristas Dispon\u00EDveis:"),
            React.createElement("ul", null, drivers.map((driver) => (React.createElement("li", { key: driver.id },
                React.createElement("strong", null, driver.name),
                " - R$ ",
                driver.value.toFixed(2)))))))));
};
export default RideEstimator;
