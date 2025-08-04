import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: []
    },
    reducers: {
        addCartItems : (state, action) => {
            state.cartItems.push(action.payload)
        },
        removeItem : (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload)
        }
    }
})

export const {addCartItems, removeItem} = cartSlice.actions;
export default cartSlice.reducer;