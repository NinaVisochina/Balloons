// ordersApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../env';
import { OrderStatus } from '../interfaces/order';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<void, { userId: string; items: any; totalAmount: number }>({
      query: (orderData) => ({
        url: '/Order/create',
        method: 'POST',
        body: orderData,
      }),
    }),
    getOrders: builder.query<any, void>({
      query: () => '/orders',
    }),
    getAdminOrders: builder.query<any, void>({
      query: () => '/Order/orders',
    }),    
    updateOrderStatus: builder.mutation<void, { orderId: number; status: OrderStatus }>({
      query: ({ orderId, status }) => {
        console.log("Запит до API:", { orderId, status }); // Логування запиту
        return {
          url: `/Order/${orderId}/status`,
          method: "PUT",
          body: { status },
        };
      },
    }),   
  }),
});

export const { useCreateOrderMutation, useGetOrdersQuery, useUpdateOrderStatusMutation, useGetAdminOrdersQuery } = ordersApi;
