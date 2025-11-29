/**
 * Mock API function for testing
 * Randomly succeeds or fails to simulate real API behavior
 * 
 * @param {number} successProbability - Probability of success (0-1, default: 0.5)
 * @returns {Promise<Object>} - Mock response data
 * @throws {Error} - When the mock API call fails
 */
async function mockApiCall(successProbability = 0.5) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        const delay = Math.random() * 200 + 100; // 100-300ms delay
        const random = Math.random();
        
        setTimeout(() => {
            if (random < successProbability) {
                resolve({
                    success: true,
                    message: 'Mock API call succeeded!',
                    data: {
                        id: Math.floor(Math.random() * 1000),
                        timestamp: new Date().toISOString(),
                        value: `Random data ${Math.random().toString(36).substring(7)}`
                    },
                    attempts: 1
                });
            } else {
                reject(new Error(`Mock API call failed (random: ${random.toFixed(2)}, success threshold: ${successProbability})`));
            }
        }, delay);
    });
}

/**
 * Creates a mock fetch function for testing without real HTTP calls
 * 
 * @param {number} successProbability - Probability of success (0-1, default: 0.3)
 * @returns {Function} - Mock fetch function
 */
function createMockFetch(successProbability = 0.3) {
    let attemptCount = 0;
    
    return async function mockFetch(url) {
        attemptCount++;
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 50));
        
        // Randomly succeed or fail
        if (Math.random() < successProbability) {
            return {
                ok: true,
                status: 200,
                statusText: 'OK',
                url: url,
                json: async () => ({
                    data: `Success from ${url}`,
                    attempt: attemptCount,
                    timestamp: new Date().toISOString()
                })
            };
        } else {
            // Simulate different types of errors
            const errorTypes = [
                { status: 500, statusText: 'Internal Server Error' },
                { status: 503, statusText: 'Service Unavailable' },
                { status: 429, statusText: 'Too Many Requests' },
                { status: 404, statusText: 'Not Found' }
            ];
            const errorType = errorTypes[Math.floor(Math.random() * errorTypes.length)];
            
            return {
                ok: false,
                ...errorType,
                url: url,
                json: async () => ({ error: 'Mock API failure' })
            };
        }
    };
}

module.exports = { mockApiCall, createMockFetch };