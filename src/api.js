import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const registerUser = (userData) => axios.post(`${API_BASE_URL}/register`, userData);
export const loginUser = (userData) => axios.post(`${API_BASE_URL}/login`, userData);
export const searchBreweries = (type, term) => axios.get(`https://api.openbrewerydb.org/breweries?${type}=${term}`);
export const getBreweryDetails = (id) => axios.get(`https://api.openbrewerydb.org/breweries/${id}`);
export const getReviews = (postId) => axios.get(`${API_BASE_URL}/reviews/${postId}`);
export const addReview = (reviewData, token) => axios.post(`${API_BASE_URL}/reviews`, reviewData, { headers: { Authorization: `Bearer ${token}` } });
export const deleteReview = (id, token) => axios.delete(`${API_BASE_URL}/reviews/${id}`, { headers: { Authorization: `Bearer ${token}` } });
