import { BasicCar, Car } from '../types';

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

  public createCar = async (body: BasicCar): Promise<Car> => {
    const res = await fetch(this.url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json() as Car;
    return data;
  };
};

export const garageService = new GarageService();
