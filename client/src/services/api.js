import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const submitEnquiry = (data) => api.post('/api/enquiries', data);
export const getTestimonials = ()   => api.get('/api/testimonials');
export const getGallery = (category) =>
  api.get('/api/gallery', { params: category && category !== 'All' ? { category } : {} });

export default api;
