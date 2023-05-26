export interface Finisheds {
  data: [
    {
      id: number;
      type: string;
      model: string;
      serial: string;
      password: string;
      charger: string;
      pattern: string;
      task: string;
      created_at: string;
      client_id: number;
      client: {
        id: number;
        address: string;
        dni: string;
        email: string;
        telephone: string;
        name: string;
      };
    }
  ];
}
