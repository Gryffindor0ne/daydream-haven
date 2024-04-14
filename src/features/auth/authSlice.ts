import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '~/app/store';

const initialState = {
    isAuthenticated: false,
    isLoading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticated(state, action) {
            state.isAuthenticated = action.payload;
        },
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
    },
});

export const { setAuthenticated, setLoading } = authSlice.actions;

export const authState = (state: RootState) => state.auth;

const authReducer = authSlice.reducer;

export default authReducer;
