import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../env";
import { ISubCategoryItem } from "../interfaces/subcategory";

export const subcategoryApi = createApi({
    reducerPath: "subcategoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
    endpoints: (builder) => ({
        getSubCategories: builder.query<ISubCategoryItem[], void>({
            query: () => "/subcategory",
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
        }),
        getSubCategoryById: builder.query<ISubCategoryItem, number>({
            query: (id) => `/subcategory/${id}`, // Отримання підкатегорії за ID
        }),
        getSubCategoryBySlug: builder.query<ISubCategoryItem, string>({
            query: (slug) => `/subcategory/slug/${slug}`, // ✅ Отримання підкатегорії за SLUG
        }),
        getSubCategoriesByCategoryId: builder.query<ISubCategoryItem[], number>({
            query: (categoryId) => `/subcategory/category/${categoryId}`, // ✅ Отримання підкатегорій за categoryId
        }),
        deleteSubCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `/subcategory/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetSubCategoriesQuery,
    useDeleteSubCategoryMutation,
    useGetSubCategoryByIdQuery,
    useGetSubCategoryBySlugQuery, // ✅ Хук для отримання підкатегорії через SLUG
    useGetSubCategoriesByCategoryIdQuery, // ✅ Новий хук для отримання підкатегорій за categoryId
} = subcategoryApi;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { API_URL } from "../env";
// import { ISubCategoryItem } from "../interfaces/subcategory";

// export const subcategoryApi = createApi({
//     reducerPath: "subcategoryApi",
//     baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
//     endpoints: (builder) => ({
//         getSubCategories: builder.query<ISubCategoryItem[], void>({
//             query: () => "/subcategory",
//             // Refetch when the page arg changes
//             forceRefetch({ currentArg, previousArg }) {
//                 return currentArg !== previousArg;
//             },
//         }),
//         getSubCategoryById: builder.query<ISubCategoryItem, number>({
//             query: (id) => `/subcategory/${id}`, // Отримання підкатегорії за ID
//         }),
//         getSubCategoryBySlug: builder.query<ISubCategoryItem, string>({
//             query: (slug) => `/subcategory/slug/${slug}`, // ✅ Отримання підкатегорії за SLUG
//         }),
//         deleteSubCategory: builder.mutation<void, number>({
//             query: (id) => ({
//                 url: `/subcategory/${id}`,
//                 method: "DELETE",
//             }),
//         }),
//     }),
// });

// export const { 
//     useGetSubCategoriesQuery, 
//     useDeleteSubCategoryMutation,
//     useGetSubCategoryByIdQuery,
//     useGetSubCategoryBySlugQuery, // ✅ Додаємо хук для отримання підкатегорії через SLUG
// } = subcategoryApi;
