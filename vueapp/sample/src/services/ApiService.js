
// Define the base URL for the API endpoint
const API_URL = 'https://your-api-url.com/endpoint'; // Replace with your actual API endpoint

// Function to fetch JSON data using a GET request
export async function fetchJsonData() {
    try {
        const response = await fetch(API_URL);

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        return data; // Return the data from the response
    } catch (error) {
        console.error("Error fetching JSON data:", error);
        throw error; // Re-throw the error so it can be handled by the caller
    }
}

// Function to send JSON data using a PUT request
export async function putJsonData(data) {
    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Convert the data to JSON string before sending
        });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`Error updating data: ${response.statusText}`);
        }

        const responseData = await response.json();
        return responseData; // Return the response data if needed
    } catch (error) {
        console.error("Error updating JSON data:", error);
        throw error; // Re-throw the error so it can be handled by the caller
    }
}

// Function to send JSON data using a POST request (optional, if needed)
export async function postJsonData(data) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error posting data: ${response.statusText}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error posting JSON data:", error);
        throw error;
    }
}

// Function to delete data using a DELETE request (optional, if needed)
export async function deleteData(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error deleting data: ${response.statusText}`);
        }

        return true; // Return true if deletion was successful
    } catch (error) {
        console.error("Error deleting data:", error);
        throw error;
    }
}
