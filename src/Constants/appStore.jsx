import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../Constants/productSlice";
import cartSlice from "../Constants/cartSlice";

const appStore = configureStore({
    reducer: {
        products: productSlice,
        cart: cartSlice
    }
})

export default appStore;