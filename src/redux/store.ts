import table from './slice/tableSlice'
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    table,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
