import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: "products",
    initialState: {
        item: []
    },
    reducers: {
        addItems: (state, action) => {
            state.item= action.payload
        }
    }
})
export default productSlice.reducer;
export const { addItems } = productSlice.actions;