import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const countingTotalPrice = (state) => {
  state.totalPrice = state.items.reduce((sum, item) => {
    return item.price * item.count + sum;
  }, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
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
    minusItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) {
        if (!findItem.count <= 0) {
          findItem.count--;
          state.totalPrice -= findItem.price;
        }
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      countingTotalPrice(state);
    },
    claerItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart;

export const { addItem, removeItem, minusItem, claerItems } = cartSlice.actions;

export default cartSlice.reducer;
