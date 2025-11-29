/**
 * Async Data Fetcher with Retry
 * 
 * Fetches data from a URL with retry logic:
 * - Retries on failure (up to max retry count)
 * - Waits 1 second between retries
 * - Returns data or throws error after all retries fail
 * - Uses async/await
 * 
 * @param {string} url - The URL to fetch data from
 * @param {number} maxRetries - Maximum number of retry attempts (default: 3)
 * @returns {Promise<any>} - Fetched data
 * @throws {Error} - After all retry attempts fail
 */
async function fetchWithRetry(url, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
        try {
            console.log(`🔄 Attempt ${attempt} of ${maxRetries + 1} to fetch ${url}`);
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log(`✅ Successfully fetched data on attempt ${attempt}`);
            return data;
            
        } catch (error) {
            lastError = error;
            console.error(`❌ Attempt ${attempt} failed:`, error.message);
            
            // Only retry if we haven't reached max retries
            if (attempt <= maxRetries) {
                console.log('⏳ Waiting 1 second before retry...');
                await new Promise(resolve => setTimeout(resolve, 1000)); // Fixed 1-second delay
            }
        }
    }
    
    // If we get here, all attempts failed
    throw new Error(`All ${maxRetries} retry attempts failed. Last error: ${lastError.message}`);
}

module.exports = fetchWithRetry;