import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';


export const api = {
    // Dataset operations
    loadDataset: async (dataset, tables) => {
        const response = await axios.post(`${API_BASE_URL}/datasets/load`, {
            dataset,
            tables
        });
        return response.data;
    },

    // Join operations
    performJoin: async (relations, joinConditions) => {
        const response = await axios.post(`${API_BASE_URL}/join`, {
            relations,
            joinConditions
        });
        return response.data;
    },

    // Analysis
    analyzePerformance: async (joinId) => {
        const response = await axios.post(`${API_BASE_URL}/analyze/performance`, {
            joinId
        });
        return response.data;
    }
};