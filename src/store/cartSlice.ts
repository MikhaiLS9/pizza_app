import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";

export const CART_PERSISTENT_STATE = "cartData";

export interface CarttItem {
  id: number;
  count: number;
}

export interface CarttState {
  items: CarttItem[];
}
const initialState: CarttState = loadState<CarttState>(
  CART_PERSISTENT_STATE
) ?? { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    remove: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        if (state.items[index].count > 1) {
          state.items[index].count -= 1;
        } else {
          state.items.splice(index, 1);
        }
      }
    },

    add: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index === -1) {
        state.items.push({ id: action.payload, count: 1 });
      } else {
        state.items[index].count += 1;
      }
    },
  },
});

export const userCartAction = cartSlice.actions;
export default cartSlice.reducer;
