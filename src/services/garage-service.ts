import { Car } from '../types';

class GarageService {
  private readonly url = 'http://127.0.0.1:3000/garage';

  public getCars = async (
    { pageNumber, limit }: {
      pageNumber: number;
      limit: number;
    }
  ): Promise<{ count: number, data: Car[] }> => {
    const res = await fetch(`${this.url}?_page=${pageNumber}&_limit=${limit}`);
    const data = await res.json() as Car[];
  
    const count = Number(res.headers.get('X-Total-Count'));
  
    return { count, data };
  };

  public createCar = async (body: Car): Promise<Car> => {
    const res = await fetch(this.url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json() as Car;
    return data;
  };

  public deleteCar = async (id: number): Promise<void> => {
    await fetch(`${this.url}/${id}?id=${id}`, { method: 'DELETE' });
  };

  public updateCar = async (newCar: Car): Promise<Car> => {
    const { id, name, color } = newCar;
    const res = await fetch(`${this.url}/${id}?id=${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ color, name }) });
    const data = await res.json() as Car;
    return data;
  };
};

export const garageService = new GarageService();
