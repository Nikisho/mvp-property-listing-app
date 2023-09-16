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
    },
    tenancyApplications: [],
};

export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        setTenancyApplications: (state, action) => {
            state.tenancyApplications = action.payload;
        }
    },
});

export const { 
    setCurrentUser,
    setTenancyApplications
} = navSlice.actions;

export const selectCurrentUser = (state: any) => state.nav.currentUser;
export const selectTenancyApplications = (state: any) => state.nav.tenancyApplications;

export default navSlice.reducer;
