import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategoryItem } from '../interfaces/categories';
import { API_URL } from '../env';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
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
