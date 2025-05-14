import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../../api/services/productService';

interface Product {
    id: string;
    image_link: string;
    title: string;
    description: string;
    delivery_price: string;
}

interface ProductState {
    loading: boolean;
    products: Product[];
    error: string | null;
}

const initialState: ProductState = {
    loading: false,
    products: [],
    error: null,
};

// Async thunk to fetch products
export const getProductList = createAsyncThunk(
    'products/fetch',
    async (
        {
            token,
            storeId,
            categoryId,
        }: { token: string; storeId: string; categoryId: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetchProducts(token, storeId, categoryId);
            console.log(`response: `, response)
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Something went wrong');
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearProducts: (state) => {
            state.products = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductList.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProductList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
