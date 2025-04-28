import axios from "axios";

const API_BASE_URL = "https://learn-language-app-production.up.railway.app/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchData = async (endpoint) => {
    try {
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
        console.error(`API fetch error [${endpoint}]:`, error);
        throw error;
    }
};
