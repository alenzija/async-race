import { Order, Sort, Winner } from '../types';

class WinnersService {
  private url = 'http://127.0.0.1:3000/winners';

  public getWinners = async ({ pageNumber, limit, sort, order} : {
    pageNumber: number;
    limit: number;
    sort: Sort;
    order: Order;
  }): Promise<{ count: number, data: Winner[] }> => {
    const res = await fetch(`${this.url}?_page=${pageNumber}&_limit=${limit}&_sort=${sort}&_order=${order}`);
    const data = await res.json() as Winner[];
    const count = Number(res.headers.get('X-Total-Count'));
    return { count, data };
  };
}

export const winnerService = new WinnersService();
