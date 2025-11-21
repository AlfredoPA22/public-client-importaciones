export type ImportStatus =
  | 'EN_PROCESO'
  | 'EN_TRANSITO'
  | 'EN_TALLER'
  | 'EN_ADUANA'
  | 'ENTREGADO';

export interface StatusHistoryEntry {
  status: ImportStatus;
  timestamp?: string;
  changed_at?: string;
  note?: string;
  notes?: string;
}

export interface CarInfo {
  brand: string;
  model: string;
  year: number;
  color?: string;
  vin?: string;
  description?: string;
}

export interface ClientInfo {
  name: string;
  company?: string;
  email?: string;
  phone?: string;
}

export interface PublicImport {
  token: string;
  status: ImportStatus;
  status_history?: StatusHistoryEntry[];
  fecha_tentativa_entrega?: string;
  car?: CarInfo;
  client?: ClientInfo;
  costos_cliente?: Record<string, number>;
  notes?: string;
  images?: string[];
  updated_at: string;
}

export const STATUS_DESCRIPTIONS: Record<ImportStatus, string> = {
  EN_PROCESO: 'Su importación está en proceso.',
  EN_TRANSITO: 'Su vehículo está en tránsito.',
  EN_TALLER: 'Su vehículo está en el taller.',
  EN_ADUANA: 'Su vehículo está en aduana.',
  ENTREGADO: 'Su vehículo ha sido entregado.',
};

