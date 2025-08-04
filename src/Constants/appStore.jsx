import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../Constants/productSlice";

const appStore = configureStore({
    reducer: {
        products: productSlice
    }
})

export default appStore;