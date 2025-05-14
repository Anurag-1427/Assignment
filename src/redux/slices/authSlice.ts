import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    mobile: string;
    token: string | null;
}

const initialState: AuthState = {
    mobile: '',
    token: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMobile: (state, action: PayloadAction<string>) => {
            state.mobile = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.mobile = '';
            state.token = null;
        },
    },
});

export const { setMobile, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
