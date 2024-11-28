import { Request, Response } from 'express';
import pool from '../database';
import dotenv from 'dotenv'
import { getRoute } from '../services/googleService';

dotenv.config ()

export const estimateRide = async (req: Request, res: Response): Promise<void> => {
  const { customer_id, origin, destination } = req.body;

  if (!customer_id || !origin || !destination || origin === destination) {
    res.status(400).json({ error_code: 'INVALID_DATA', error_description: 'Dados inválidos.' });
    return;
  }

  try {
    const connection = await pool.getConnection();
    const [drivers]: any = await connection.query('SELECT * FROM drivers');
    connection.release();

    const routeData = await getRoute(origin, destination);
    const { legs } = routeData.routes[0];
    const { distance, duration, start_location, end_location } = legs[0];

    const availableDrivers = drivers
    .filter((driver: any) => distance.value / 1000 >= driver.min_distance)
    .map((driver: any) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      rating: driver.rating,
      value: (distance.value / 1000) * driver.price_per_km,
    }))

    res.status(200).json({
      customer_id: customer_id,
      origin: { latitude: start_location.lat, longitude: start_location.lng },
      destination: { latitude: end_location.lat, longitude: end_location.lng },
      distance: distance.text,
      duration: duration.text,
      options: availableDrivers,
      routeResponse: routeData,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao calcular a estimativa da viagem.' });
  }
};

export const confirmRide = async (req: Request, res: Response): Promise<void> => {
  const { customer_id, origin, destination, distance, duration, driver, value } = req.body;

  if (!customer_id || !origin || !destination || !driver || !distance || !duration || origin === destination) {
    res.status(400).json({ error_code: 'INVALID_DATA', error_description: 'Dados inválidos.' });
    return;
  }

  try {
    const connection = await pool.getConnection();
    
    const originString = `${origin.latitude}, ${origin.longitude}`;
    const destinationString = `${destination.latitude}, ${destination.longitude}`;
    
    const customer_id_int = parseInt(customer_id, 10);
    const driver_id_int = parseInt(driver.id, 10);

    await connection.execute(
      'INSERT INTO rides (customer_id, origin, destination, distance, duration, driver_id, value) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [customer_id_int, originString, destinationString, distance, duration, driver_id_int, value]
    );
    connection.release();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao salvar a viagem:', error);
    res.status(500).json({ error: 'Erro ao salvar a viagem.' });
  }
};

export const getRides = async (req: Request, res: Response): Promise<void> => {
  const { customer_id } = req.params; 
  const { driver_id } = req.query;  

  if (!customer_id) {
    res.status(400).json({ error_code: 'INVALID_DATA', error_description: 'ID do usuário é obrigatório.' });
    return;
  }

  try {
   
    const query = `
      SELECT r.id, r.origin, r.destination, r.distance, r.duration, r.value, d.name AS driver_name
      FROM rides r
      JOIN drivers d ON r.driver_id = d.id
      WHERE r.customer_id = ?
      ${driver_id ? 'AND r.driver_id = ?' : ''}
      ORDER BY r.created_at DESC
    `;
    const params = driver_id ? [customer_id, driver_id] : [customer_id];

    const [rides]: any = await pool.query(query, params); 

    if (rides.length === 0) {
      res.status(404).json({ error_code: 'NO_RIDES_FOUND', error_description: 'Nenhuma viagem encontrada.' });
      return;
    }

    res.status(200).json({ customer_id, rides });
  } catch (error) {
    console.error('Erro ao buscar viagens:', error);
    res.status(500).json({ error: 'Erro ao buscar viagens.' });
  }
};


