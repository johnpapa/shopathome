export class Discount {
  id: number = 0;
  store?: string = '';
  percentage?: number = 0;
  code?: string = '';
}

export class Product {
  constructor(
    public id: number,
    public name: string = '',
    public description: string = '',
    public quantity: number = 0,
  ) {}
}
