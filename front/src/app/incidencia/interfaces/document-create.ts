export interface DocumentCreate {
  id: number;
  type: string;
  model: string;
  serial: string;
  password: string;
  charger: string;
  pattern: string;
  task: string;
  client_id: number;
}
