import api from "../axios";

export const getTalentDashboard = async () => {
    const res = await api.get('/api/talent/dashboard/')
    return res.data
}
