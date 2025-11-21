import type { PublicImport } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const mockImport = (token: string): PublicImport => ({
  token,
  status: 'EN_PROCESO',
  status_history: [
    { status: 'EN_PROCESO', timestamp: new Date().toISOString(), note: 'Documentación recibida' },
    { status: 'EN_TRANSITO', timestamp: new Date(Date.now() - 86400000 * 3).toISOString() },
  ],
  fecha_tentativa_entrega: new Date(Date.now() + 86400000 * 10).toISOString(),
  car: {
    brand: 'Toyota',
    model: 'RAV4',
    year: 2021,
    color: 'Azul',
    vin: 'JTMB1RFV3MD123456',
    description: 'SUV híbrida en excelentes condiciones',
  },
  client: {
    name: 'Cliente Demo',
    company: 'Empresa XYZ',
    email: 'cliente@demo.com',
    phone: '+1 555 123 4567',
  },
  costos_cliente: {
    'Compra vehículo': 18000,
    'Transporte marítimo': 1200,
    'Aranceles': 2500,
    'Honorarios': 900,
  },
  notes: 'Recuerde presentar la documentación original en aduana.',
  images: [
    'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg',
    'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg',
  ],
  updated_at: new Date().toISOString(),
});

export const shareApi = {
  async getPublicImport(token: string): Promise<PublicImport> {
    if (!token) {
      throw new Error('Token no proporcionado');
    }

    if (!API_BASE_URL) {
      return mockImport(token);
    }

    const response = await fetch(`${API_BASE_URL}/share/${token}`);

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || 'Error al consultar la importación');
    }

    return response.json();
  },
};

