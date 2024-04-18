import { Car } from '../types';

class GarageService {
  private readonly garageUrl = 'http://127.0.0.1:3000/garage';
  private readonly engineUrl = ({
    id,
    status,
   }: { 
    id: number;
    status: 'started' | 'drive' | 'stopped';
 }) => `http://127.0.0.1:3000/engine?id=${id}&status=${status}`;

  public getCars = async (
    { pageNumber, limit }: {
      pageNumber: number;
      limit: number;
    }
  ): Promise<{ count: number, data: Car[] }> => {
    const res = await fetch(`${this.garageUrl}?_page=${pageNumber}&_limit=${limit}`);
    const data = await res.json() as Car[];
  
    const count = Number(res.headers.get('X-Total-Count'));
  
    return { count, data };
  };

  public getCar = async (id: number): Promise<Car> => {
    const res = await fetch(`${this.garageUrl}/${id}?id=${id}`);
    const data = await res.json() as Car;
    return data;
  };


  public createCar = async (body: Car): Promise<Car> => {
    const res = await fetch(this.garageUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json() as Car;
    return data;
  };

  public deleteCar = async (id: number): Promise<void> => {
    await fetch(`${this.garageUrl}/${id}?id=${id}`, { method: 'DELETE' });
  };

  public updateCar = async (newCar: Car): Promise<Car> => {
    const { id, name, color } = newCar;
    const res = await fetch(`${this.garageUrl}/${id}?id=${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ color, name }) });
    const data = await res.json() as Car;
    return data;
  };

  public doStart = async (id: number): Promise<number> => {
    const res = await fetch(this.engineUrl({ id, status: 'started' }), { method: 'PATCH' });
    const { distance, velocity } = await res.json();
    return distance / velocity;
  };

  public doDrive = async (id: number, signal: AbortSignal): Promise<boolean> => {
    try {
      const res = await fetch(this.engineUrl({ id, status: 'drive' }), { method: 'PATCH', signal });
      return res.ok;
    } catch (e) {
      return Promise.resolve(false);
    }
  };

  public doStop = async (id: number): Promise<Response> => fetch(this.engineUrl({ id, status: 'stopped' }), { method: 'PATCH' });
};

export const garageService = new GarageService();
