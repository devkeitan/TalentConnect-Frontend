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

// ─── Bookings (Organizer) ─────────────────────────────────────
export const getMyBookings = async () => {
    // Organizer sees their sent booking requests
    const res = await api.get('/api/organizer/bookings/');
    return res.data;
};

export const sendBookingRequest = async (data) => {
    // data: { event, talent, duration, message }
    const res = await api.post('/api/organizer/bookings/', data);
    return res.data;
};

export const updateEvent = async (eventId, data) => {
    const res = await api.put(/api/organizer/events/${eventId}/, data);
    return res.data;
};

// ─── Bookings (Talent) ────────────────────────────────────────
export const getBookingInbox = async () => {
    // Talent sees incoming booking requests
    const res = await api.get('/api/organizer/bookings/inbox/');
    return res.data;
};

export const updateBookingStatus = async (bookingId, status) => {
    // Talent accepts or rejects — status: 'accepted' | 'rejected'
    const res = await api.patch(/api/organizer/bookings/${bookingId}/status/, { status });
    return res.data;
};

export const cancelBookingRequest = async (bookingId) => {
    const res = await api.delete(/api/organizer/bookings/${bookingId}/cancel/);
    return res.data;
};