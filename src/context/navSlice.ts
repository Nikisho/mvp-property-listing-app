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
    },

    avatarIcon: "https://dwhhfiboburmnbvsmhjn.supabase.co/storage/v1/object/public/application-bucket/avataricon.png?t=2023-12-20T15%3A10%3A47.464Z"
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
export const selectAvatarIcon = (state: any) => state.nav.avatarIcon;

export default navSlice.reducer;
