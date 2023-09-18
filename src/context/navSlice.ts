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
    room: {
        id: null,
        imageUrl: null,
        recipient: null
    }
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
        },
        setRoom: (state, action) => {
            state.room = action.payload;
        }
    },
});

export const { 
    setCurrentUser,
    setTenancyApplications,
    setRoom
} = navSlice.actions;

export const selectCurrentUser = (state: any) => state.nav.currentUser;
export const selectTenancyApplications = (state: any) => state.nav.tenancyApplications;
export const selectRoom = (state: any) => state.nav.room;


export default navSlice.reducer;
