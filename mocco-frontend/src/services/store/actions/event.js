import axios from "axios";
import { createEventFail, createEventRequest, createEventSuccess, deleteEventFail, deleteEventRequest, deleteEventSuccess, getEventsFail, getEventsRequest, getEventsSuccess } from "../slices/eventSlice";


const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Create a new event
const createEvent = (eventFormData) => async (dispatch) => {
    try {

        dispatch(createEventRequest());

        const { data } = await axios.post(`${backendUrl}/event/create`, eventFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        });
        dispatch(createEventSuccess(data.event));
        return data;

    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to create event";

        dispatch(createEventFail(message));
        throw new Error(message);
    }
}

// Get all events
const getEvents = (shopId) => async (dispatch) => {
    try {
        dispatch(getEventsRequest());
        const { data } = await axios.get(`${backendUrl}/event/all/${shopId}`,
            //     {
            //     withCredentials: true,
            // }
        );
        dispatch(getEventsSuccess(data.events));
    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to fetch events";
        dispatch(getEventsFail(message));
    }
}

// Delete event by id
const deleteEvent = (eventId) => async (dispatch) => {
    try {
        dispatch(deleteEventRequest());
        const { data } = await axios.delete(`${backendUrl}/event/delete/${eventId}`, {
            withCredentials: true,
        });
        dispatch(deleteEventSuccess(eventId));
        return data;
    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to delete event";
        dispatch(deleteEventFail(message));
        throw new Error(message);
    }
}

export { createEvent, getEvents, deleteEvent };