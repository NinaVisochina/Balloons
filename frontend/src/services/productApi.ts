import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProductItem } from '../interfaces/products';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL
          ? `${import.meta.env.VITE_API_URL}/api`
          : '/api', // Для dev із проксі
      }),
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
        updateProduct: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: "/Products",
                method: "PUT",
                body: formData,
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
    useUpdateProductMutation,  // Додаємо мутацію для редагування
    useGetProductsByCategoryIdQuery,
    useGetProductsByCategorySlugQuery, // ✅ Доданий запит на категорію за SLUG
    useGetProductsBySubCategoryIdQuery,
    useGetProductsBySubCategorySlugQuery, // ✅ Доданий запит на підкатегорію за SLUG
    useGetProductsByNameQuery,
} = productApi;
