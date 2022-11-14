import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import Tag from '../types/Tag';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { AppDispatch } from '../store';
import { useAppSelector } from '../hooks';

const cartStr = localStorage.getItem('cart');
const initialState: CartState = cartStr ? 
	JSON.parse(localStorage.getItem('cart')!)
  : {
    cartItems: [],
    totalQty: 0,
  };

export type CartState = {
	cartItems: Tag[],
	totalQty: number,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateItemInCart: (state, action: PayloadAction<Tag>) => {
      const item = action.payload;
      // console.log('updateItemInCart payload: ');
      // console.log(action.payload);
      const existedItem = state.cartItems.find((x) => x.id === item.id);
      if (existedItem) {
				return;
      } else {
        state.cartItems = [...state.cartItems, action.payload];
				state.totalQty ++;
      }
    },
    deleteItemInCart: (state, action: PayloadAction<number>) => {
      const tagId = action.payload;
      let i;
      for (i = state.cartItems.length - 1; i >= 0; i -= 1) {
        if (state.cartItems[i].id === tagId) break;
      }
      state.totalQty --;
      state.cartItems.splice(i, 1);
    },
  },
});

export const { updateItemInCart, deleteItemInCart } = cartSlice.actions;

export const updateCartItem = (tag: Tag) => async (dispatch: AppDispatch) => {
  dispatch(
    updateItemInCart(tag),
  );
	const cartState = useAppSelector(selectCart);
  localStorage.setItem('cart', JSON.stringify(cartState));
};

export const deleteCartItem = (tagId: number) => (dispatch: AppDispatch) => {
  dispatch(deleteItemInCart(tagId));
	const cartState = useAppSelector(selectCart);
  localStorage.setItem('cart', JSON.stringify(cartState));
};

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;