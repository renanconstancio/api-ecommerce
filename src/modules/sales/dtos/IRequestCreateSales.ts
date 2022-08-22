export interface IRequestCreateSales {
  customers_id: string;
  address_id: string;
  products: {
    id: string;
    quantity: number;
    price_paid: number;
  }[];
  transations: {
    flag: string;
    payment_methods: string;
    installment: string;
    discounts: string;
    discount_type: string;
    total_price: number;
    price_increase: number;
  }[];
}
