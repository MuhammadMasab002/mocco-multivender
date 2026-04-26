import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    events: [],
    isLoading: true,
    error: null,
};

const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        // create event
        createEventRequest: (state) => {
            state.isLoading = true;
        },
        createEventSuccess: (state, action) => {
            state.isLoading = false;
            state.events.push(action.payload);
            state.error = null;
        },
        createEventFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // get all events
        getEventsRequest: (state) => {
            state.isLoading = true;
        },
        getEventsSuccess: (state, action) => {
            state.isLoading = false;
            state.events = action.payload;
            state.error = null;
        },
        getEventsFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // delete event by id
        deleteEventRequest: (state) => {
            state.isLoading = true;
        },
        deleteEventSuccess: (state, action) => {
            state.isLoading = false;
            state.events = state.events.filter(
                (event) => event._id !== action.payload
            );
            state.error = null;
        },
        deleteEventFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        // Clear error utility
        clearErrors: (state) => {
            state.error = null;
        }
    },
});

export const {
    createEventRequest,
    createEventSuccess,
    createEventFail,
    getEventsRequest,
    getEventsSuccess,
    getEventsFail,
    deleteEventRequest,
    deleteEventSuccess,
    deleteEventFail,
    clearErrors
} = eventSlice.actions;

export default eventSlice.reducer;
