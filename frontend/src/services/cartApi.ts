import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UpdateQuantityRequest } from '../interfaces/cart/UpdateQuantityRequest';
import { API_URL } from '../env';

// const API_URL = '/api/Cart'; // Adjust the URL to match your API endpoint

// export const getCart = async (userId: string) => {
//   const response = await axios.get(`${API_URL}/${userId}`);
//   console.log("Cart API Response:", response.data);
//   return response.data;
// };

// export const addToCart = async (userId: string, productId: number, quantity: number) => {
//   await axios.post(`${API_URL}/add`, { userId, productId, quantity }, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// };

// export const removeFromCart = async (userId: string, productId: number) => {
//   await axios.delete(`${API_URL}/remove/${userId}/${productId}`);
// };

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
  endpoints: (builder) => ({
    updateCartItemQuantity: builder.mutation<void, UpdateQuantityRequest>({
      query: (body) => ({
        url: '/Cart/update-quantity',
        method: 'PATCH',
        body,
      }),
    }),
    removeCartItem: builder.mutation<void, { userId: string; productId: number }>({
      query: ({ userId, productId }) => ({
        url: `/Cart/remove/${userId}/${productId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useUpdateCartItemQuantityMutation, useRemoveCartItemMutation } = cartApi;