import api from '../axios';

// Portfolio
export const getTalentPortfolio = async () => {
    const res = await api.get('/api/talent/portfolio/');
    return res.data;
};

export const createTalentPortfolio = async (data) => {
    const res = await api.post('/api/talent/portfolio/', data);
    return res.data;
};

export const updateTalentPortfolio = async (data) => {
    const res = await api.put('/api/talent/portfolio/', data);
    return res.data;
};

export const getAllTalents = async () => {
    const res = await api.get('/api/talent/portfolio/all/');
    return res.data;
};

// Media
export const uploadTalentMedia = async (formData) => {
    const res = await api.post('/api/talent/portfolio/media/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },  // ← required for file uploads
    });
    return res.data;
};

export const deleteTalentMedia = async (mediaId) => {
    const res = await api.delete(`/api/talent/portfolio/media/${mediaId}/`);
    return res.data;
};

export const getTalentById = async (id) => {
    const res = await api.get(`/api/talent/portfolio/all/${id}/`)
    return res.data
}


