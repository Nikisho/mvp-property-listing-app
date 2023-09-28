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
    messages: [],
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
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setRoom: (state, action) => {
            state.room = action.payload;
        }
    },
});

export const { 
    setCurrentUser,
    setMessages,
    setRoom
} = navSlice.actions;

export const selectCurrentUser = (state: any) => state.nav.currentUser;
export const selectMessages = (state: any) => state.nav.messages;
export const selectRoom = (state: any) => state.nav.room;


export default navSlice.reducer;
