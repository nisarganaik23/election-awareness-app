import axios from "axios";

const API_URL = "http://localhost:5000/api/voters"; // Your backend API URL

// Function to register a voter
export const registerVoter = async (voterData) => {
    try {
        const response = await axios.post(API_URL, voterData);
        return response.data; // Returns the newly registered voter
    } catch (error) {
        console.error("Error registering voter:", error.response?.data || error.message);
        throw error;
    }
};

// Function to get all voters
export const getAllVoters = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        return response.data; // Returns the list of voters
    } catch (error) {
        console.error("Error fetching voters:", error.response?.data || error.message);
        throw error;
    }
};
