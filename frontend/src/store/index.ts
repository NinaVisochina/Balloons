import { configureStore } from '@reduxjs/toolkit';
import { categoryApi } from '../services/categoryApi.ts';
import { postApi } from '../services/postApi.ts';
import { subcategoryApi } from '../services/subcategoryApi.ts';
import { productApi } from '../services/productApi.ts';
import cartReducer from '../interfaces/cart/cartSlice.ts';
import { authApi } from '../services/authApi.ts';
import { cartApi } from '../services/cartApi.ts';
import { ordersApi } from '../services/ordersApi.ts';
import wishlistReducer from "./wishlistSlice";

const store = configureStore({
    reducer: {
        [postApi.reducerPath]: postApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [subcategoryApi.reducerPath]: subcategoryApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        cart: cartReducer, // Додаємо редуктор для кошика
        wishlist: wishlistReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            postApi.middleware,
            categoryApi.middleware,
            subcategoryApi.middleware,
            productApi.middleware,
            authApi.middleware,
            cartApi.middleware,
            ordersApi.middleware,
        ),
});
export type RootState = ReturnType<typeof store.getState>;
export default store;