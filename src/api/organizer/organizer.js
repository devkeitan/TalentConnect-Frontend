import api from '../axios';


// ─── Events ──────────────────────────────────────────────────
export const getEvents = async () => {
    const res = await api.get('/api/organizer/events/');
    return res.data;
};

export const createEvent = async (data) => {
    const res = await api.post('/api/organizer/events/', data);
    return res.data;
};

export const deleteEvent = async (eventId) => {
    const res = await api.delete(`/api/organizer/events/${eventId}/`);
    return res.data;
};


