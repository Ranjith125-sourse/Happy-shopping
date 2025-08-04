import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addCartItems: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    decreaseQuantity: (state, action) => {
        const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload);
        if(itemIndex >= 0) {
            if(state.cartItems[itemIndex].quantity > 0) {
                state.cartItems[itemIndex].quantity -= 1;
            }
        }
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addCartItems, removeItem, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
