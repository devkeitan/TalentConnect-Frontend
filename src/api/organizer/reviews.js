import api from '../axios';

export const getMyReviews = async () => {
    const res = await api.get('/api/organizer/reviews/')
    return res.data
}

export const submitReview = async (data) => {
    const res = await api.post('/api/organizer/reviews/', data)
    return res.data
}

export const getTalentReviews = async (talentId) => {
    const res = await api.get(`/api/organizer/reviews/talent/${talentId}/`)
    return res.data
}
