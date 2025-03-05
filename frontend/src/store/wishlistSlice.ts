import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWishListItem } from "../interfaces/wishlist";

interface WishListState {
  items: IWishListItem[];
}

const initialState: WishListState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishList: (state, action: PayloadAction<IWishListItem[]>) => {
      state.items = action.payload;
    },
    addToWishList: (state, action: PayloadAction<IWishListItem>) => {
      if (!state.items.some(item => item.productId === action.payload.productId)) {
        state.items.push(action.payload);
      }
    },
    removeFromWishList: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
  },
});

export const { setWishList, addToWishList, removeFromWishList } = wishlistSlice.actions;
export default wishlistSlice.reducer;
