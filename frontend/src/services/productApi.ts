import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProductItem } from '../interfaces/products';
import { API_URL } from '../env';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
    endpoints: (builder) => ({
        getProducts: builder.query<IProductItem[], void>({
            query: () => '/products',
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
        }),
        deleteProduct: builder.mutation<void, number>({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'DELETE',
            }),
        }),
        getProductById: builder.query<IProductItem, number>({
            query: (id) => `/products/${id}`,
        }),
        getProductBySlug: builder.query<IProductItem, string>({
            query: (slug) => `/products/slug/${slug}`, // ✅ Запит на отримання продукту за SLUG
        }),
        getProductsByCategoryId: builder.query<IProductItem[], number>({
            query: (id) => `/category/${id}/products`,
        }),
        getProductsByCategorySlug: builder.query<IProductItem[], string>({
            query: (slug) => `/category/slug/${slug}/products`, // ✅ Отримання продуктів категорії за SLUG
        }),
        getProductsBySubCategoryId: builder.query<IProductItem[], number>({
            query: (id) => `/products/bySubCategory/${id}`,
        }),
        getProductsBySubCategorySlug: builder.query<IProductItem[], string>({
            query: (slug) => `/subcategory/slug/${slug}/products`, // ✅ Отримання продуктів підкатегорії за SLUG
        }),
        getProductsByName: builder.query<IProductItem[], string>({
            query: (name) => `/products/search?name=${encodeURIComponent(name)}`, // Оновлено параметр name
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetProductBySlugQuery, // ✅ Запит на продукт за SLUG
    useDeleteProductMutation,
    useGetProductsByCategoryIdQuery,
    useGetProductsByCategorySlugQuery, // ✅ Доданий запит на категорію за SLUG
    useGetProductsBySubCategoryIdQuery,
    useGetProductsBySubCategorySlugQuery, // ✅ Доданий запит на підкатегорію за SLUG
    useGetProductsByNameQuery,
} = productApi;
