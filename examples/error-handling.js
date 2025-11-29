const { fetchWithRetry, createMockFetch } = require('../src');

/**
 * Error handling example showing different failure scenarios
 */
async function errorHandlingExample() {
    console.log('🚀 Error Handling Example\n');
    
    const originalFetch = global.fetch;
    
    // Test 1: All retries fail
    console.log('1. All Retries Fail Scenario:');
    console.log('='.repeat(40));
    
    global.fetch = createMockFetch(0.1); // Very low success rate
    
    try {
        await fetchWithRetry('https://api.unreliable.com/data', 2);
        console.log('❌ Unexpected success!');
    } catch (error) {
        console.log('✅ Correctly handled complete failure:', error.message);
    }
    
    // Test 2: Success on last attempt
    console.log('\n2. Success on Last Attempt:');
    console.log('='.repeat(40));
    
    let attemptCount = 0;
    global.fetch = async (url) => {
        attemptCount++;
        await new Promise(resolve => setTimeout(resolve, 50));
        
        if (attemptCount < 3) {
            return { ok: false, status: 500, statusText: 'Server Error' };
        } else {
            return {
                ok: true,
                status: 200,
                json: async () => ({ data: 'Success on last attempt!', attempt: attemptCount })
            };
        }
    };
    
    try {
        const result = await fetchWithRetry('https://api.recovering.com/data', 3);
        console.log('✅ Success on retry:', result.data);
        console.log('   Attempts made:', result.attempt);
    } catch (error) {
        console.log('❌ Unexpected failure:', error.message);
    }
    
    // Restore original fetch
    global.fetch = originalFetch;
    
    console.log('\n✨ Error handling example completed!');
}

// Run the example
if (require.main === module) {
    errorHandlingExample().catch(console.error);
}

module.exports = errorHandlingExample;