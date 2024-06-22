import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  'pizza/fetchPizzasStaus',
  async (params) => {
    const { order, sortBy, categoryId, curentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://66562e759f970b3b36c48e64.mockapi.io/items?page=${curentPage}&limit=4&${
        categoryId ? `category=${categoryId}` : ''
      }&sortBy=${sortBy}&order=${order}`,
    );

    return data;
  },
);

type Pizza = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzasSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING, //loading | success | error
};

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
