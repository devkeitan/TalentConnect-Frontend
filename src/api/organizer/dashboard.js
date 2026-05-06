import api from "../axios"

export const getOrganizerDashboard = async () => {
    const res = await api.get('/api/organizer/dashboard/')
    return res.data
}
