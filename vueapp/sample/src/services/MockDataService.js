// Function to fetch JSON data using a GET request
export async function fetchMockData(url) {
    try {
        const response = await fetch(url);

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