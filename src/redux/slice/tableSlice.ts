import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface TableState{
  modalFlag:boolean,
  selectedRow: string
}

const initialState: TableState = {
  modalFlag: false,
  selectedRow: ''
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    changeModalFlag: (state) => {
      state.modalFlag = !state.modalFlag;
    },
    changeSelectedRow(state, action: PayloadAction<string>) {
      state.selectedRow = action.payload
    },
  },
});

export const {
  changeModalFlag,
  changeSelectedRow
} = tableSlice.actions;

export const selectTable = (state: RootState) => state.table;

export default tableSlice.reducer;
