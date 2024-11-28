"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRides = exports.confirmRide = exports.estimateRide = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
const googleService_1 = require("../services/googleService");
dotenv_1.default.config();
// POST /ride/estimate
const estimateRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer_id, origin, destination } = req.body;
    if (!customer_id || !origin || !destination || origin === destination) {
        res.status(400).json({ error_code: 'INVALID_DATA', error_description: 'Dados inválidos.' });
        return;
    }
    try {
        // Busque os motoristas no banco de dados
        const connection = yield database_1.default.getConnection();
        const [drivers] = yield connection.query('SELECT * FROM drivers');
        connection.release();
        // Chamando a API do Google Maps
        const routeData = yield (0, googleService_1.getRoute)(origin, destination);
        const { legs } = routeData.routes[0];
        const { distance, duration, start_location, end_location } = legs[0];
        const availableDrivers = drivers
            .filter((driver) => distance.value / 1000 >= driver.min_distance)
            .map((driver) => ({
            id: driver.id,
            name: driver.name,
            description: driver.description,
            vehicle: driver.vehicle,
            rating: driver.rating,
            value: (distance.value / 1000) * driver.price_per_km,
        }))
            .sort((a, b) => a.value - b.value);
        res.status(200).json({
            origin: { latitude: start_location.lat, longitude: start_location.lng },
            destination: { latitude: end_location.lat, longitude: end_location.lng },
            distance: distance.text,
            duration: duration.text,
            options: availableDrivers,
            routeResponse: routeData,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao calcular a estimativa da viagem.' });
    }
});
exports.estimateRide = estimateRide;
// PATCH /ride/confirm
const confirmRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer_id, origin, destination, distance, duration, driver, value } = req.body;
    if (!customer_id || !origin || !destination || !driver || !distance || origin === destination) {
        res.status(400).json({ error_code: 'INVALID_DATA', error_description: 'Dados inválidos.' });
        return;
    }
    try {
        const connection = yield database_1.default.getConnection();
        try {
            yield connection.execute('INSERT INTO rides (customer_id, origin, destination, distance, duration, driver_id, value) VALUES (?, ?, ?, ?, ?, ?, ?)', [customer_id, origin, destination, distance, duration, driver.id, value]);
            res.status(200).json({ success: true });
        }
        finally {
            connection.release();
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao salvar a viagem.' });
    }
});
exports.confirmRide = confirmRide;
// GET /ride/:customer_id
const getRides = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer_id } = req.params;
    const { driver_id } = req.query;
    if (!customer_id) {
        res.status(400).json({ error_code: 'INVALID_DATA', error_description: 'ID do usuário é obrigatório.' });
        return;
    }
    try {
        const connection = yield database_1.default.getConnection();
        const query = `
      SELECT * FROM rides
      WHERE customer_id = ?
      ${driver_id ? 'AND driver_id = ?' : ''}
      ORDER BY created_at DESC
    `;
        const params = driver_id ? [customer_id, driver_id] : [customer_id];
        const [rides] = yield connection.query(query, params);
        if (!rides.length) {
            res.status(404).json({ error_code: 'NO_RIDES_FOUND', error_description: 'Nenhum registro encontrado.' });
            return;
        }
        res.status(200).json({ customer_id, rides });
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar viagens.' });
    }
});
exports.getRides = getRides;
