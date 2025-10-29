import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface BooksState {
  filter: { author: string; available: string };
}

const initialState: BooksState = {
  filter: { author: '', available: '' },
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ author: string; available: string }>) => {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = booksSlice.actions;
export default booksSlice.reducer;
