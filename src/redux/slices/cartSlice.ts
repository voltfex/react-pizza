import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  sizes: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

const countingTotalPrice = (state: CartSliceState) => {
  state.totalPrice = state.items.reduce((sum, item) => {
    return item.price * item.count + sum;
  }, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((item) => item.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      countingTotalPrice(state);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) {
        if (findItem.count > 1) {
          findItem.count--;
          state.totalPrice -= findItem.price;
        }
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      countingTotalPrice(state);
    },
    claerItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { addItem, removeItem, minusItem, claerItems } = cartSlice.actions;

export default cartSlice.reducer;
