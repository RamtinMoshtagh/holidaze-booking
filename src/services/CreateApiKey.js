import api, { setAuthToken } from './Api';  // Ensure this path matches your actual API module path

// Function to create a new API Key
const createApiKey = async () => {
    try {
        const token = localStorage.getItem('token'); // Make sure token is present
        if (!token) {
            console.log("No token available.");
            return;
        }

        setAuthToken(token);  // Applies the token for axios globally in your api setup

        const response = await api.post('/auth/create-api-key', {
            name: "My New API Key" // Optional
        });

        console.log("API Key creation response:", response.data); // Log the response data from server
        return response.data; // You might want to handle this data or store the new API key
    } catch (error) {
        console.error("Error creating API key:", error.response ? error.response.data : error.message);
    }
};

export default createApiKey;
