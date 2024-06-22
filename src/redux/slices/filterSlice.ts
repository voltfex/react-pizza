import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SortPropertyEnum } from './types';

type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  curentPage: number;
  sort: Sort;
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  curentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurentPage(state, action: PayloadAction<number>) {
      state.curentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setCurentPage, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
