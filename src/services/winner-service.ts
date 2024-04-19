import { Order, Sort, Winner } from '../types';

class WinnersService {
  private url = 'http://127.0.0.1:3000/winners';

  public getWinners = async ({ pageNumber, limit, sort, order} : {
    pageNumber: number;
    limit: number;
    sort: Sort;
    order: Order;
  }): Promise<{ count: number; data: Winner[] }> => {
    const res = await fetch(`${this.url}?_page=${pageNumber}&_limit=${limit}&_sort=${sort}&_order=${order}`);
    const data = await res.json() as Winner[];
    const count = Number(res.headers.get('X-Total-Count'));
    return { count, data };
  };

  public getWinner = async (id: number): Promise<Winner | null> => {
    const res = await fetch(`${this.url}/${id}?id=${id}`);
    if (res.status === 404) {
      return Promise.resolve(null);
    }
    const data = await res.json() as Winner;
    return data;
  };

  public createWinner = async (body: Winner): Promise<Winner> => {
    const res = await fetch(this.url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const winner = await res.json() as Winner;
    return winner;
  };

  public updateWinner = async (data: Winner): Promise<Winner> => {
    const { id, ...body } = data;
    const res = await fetch(`${this.url}/${id}?id=${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const winner = await res.json() as Winner;
    return winner;
  };

  public deleteWinner = async (id: number): Promise<boolean> => {
    const res = await fetch(`${this.url}/${id}?id=${id}`, { method: 'DELETE' });
    return res.ok;
  };
}

export const winnerService = new WinnersService();
