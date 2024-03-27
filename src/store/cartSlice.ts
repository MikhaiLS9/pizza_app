import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CarttItem {
  id: number;
  count: number;
}

export interface CarttState {
  items: CarttItem[];
}
const initialState: CarttState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      const existed = state.items.find((i) => i.id === action.payload);
      if (!existed) {
        state.items.push({ id: action.payload, count: 1 });
        return;
      }
      state.items.map((i) => {
        if (i.id === action.payload) {
          i.count += 1;
        }
        return i;
      });
    },
  },
});


export const userCartAction = cartSlice.actions;
export default cartSlice.reducer;
