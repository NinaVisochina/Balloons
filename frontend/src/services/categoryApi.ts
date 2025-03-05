import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategoryItem } from '../interfaces/categories';

console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        
        baseUrl: import.meta.env.VITE_API_URL
          ? `${import.meta.env.VITE_API_URL}/api`
          : '/api', // Для dev із проксі
          prepareHeaders: (headers) => {
            console.log('Category API baseUrl:', import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api');
            return headers;
          },
      }),
    endpoints: (builder) => ({
        getCategories: builder.query<ICategoryItem[], void>({
            query: () => 'category',
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
        }),
        getCategoryBySlug: builder.query<ICategoryItem, string>({ // ✅ Запит по slug
            query: (slug) => `/category/slug/${slug}`,
        }),
        deleteCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `category/${id}`,
                method: 'DELETE',
            }),
        }),
        getSubCategoriesByCategorySlug: builder.query({ // ✅ Підкатегорії через slug
            query: (categorySlug) => `/subcategory?categorySlug=${categorySlug}`,
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetCategoryBySlugQuery, // ✅ Оновлено на slug
    useGetSubCategoriesByCategorySlugQuery, // ✅ Оновлено на slug
    useDeleteCategoryMutation
} = categoryApi;
