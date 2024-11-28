import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config()

const apiKey = process.env.GOOGLE_API_KEY;

export const getRoute = async (origin: string, destination: string): Promise<any> => {
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
    origin
  )}&destination=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status !== 'OK') {
      throw new Error(`Erro da API do Google Maps: ${response.data.status} - ${response.data.error_message}`);
    }

    return response.data;
  } catch (error) {
    throw new Error('Erro ao processar dados da API do Google Maps.');
  }
};
