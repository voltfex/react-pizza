import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  curentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurentPage(state, action) {
      state.curentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setCurentPage } = filterSlice.actions;

export default filterSlice.reducer;