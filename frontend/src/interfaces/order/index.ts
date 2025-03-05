export interface IOrderItem {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }
  
  export interface ICreateOrder {
    userId: string;
    items: IOrderItem[];
    totalAmount: number;
    address: string;
    discountId?: number | null;
  }

  export interface IOrder {
    id: number;  // OrderId на бекенді
    userId: string;
    orderDate: string;  // Дата замовлення (ISO формат)
    status: string;  // Статус замовлення
    items: IOrderItem[]; // Список елементів замовлення
    totalPrice: number; // Загальна сума замовлення
    address: string;  // Адреса
}

export enum OrderStatus {
  Pending = 0,
  Completed = 1,
  Cancelled = 2,
  Shipped = 3,
}