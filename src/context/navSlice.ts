import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: {
        user: null,
        isLoggedIn: false,
        session: null,
        userTechnicalKey: null,
        imageUrl: null,
        name: null,
        email: null,
        phoneNumber: null
    }
};

export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    },
});

export const { 
    setCurrentUser 
} = navSlice.actions;

export const selectCurrentUser = (state: any) => state.nav.currentUser;

export default navSlice.reducer;
