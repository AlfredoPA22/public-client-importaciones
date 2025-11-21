import type { PublicImport } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const shareApi = {
  async getPublicImport(token: string): Promise<PublicImport> {
    if (!token) {
      throw new Error('Token no proporcionado');
    }

    const response = await fetch(`${API_BASE_URL}share/${token}`);

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || 'Error al consultar la importación');
    }

    return response.json();
  },
};

