const { fetchWithRetry, createMockFetch, mockApiCall } = require('../src');

/**
 * Example showing different configurations and use cases
 */
async function customConfigExample() {
    console.log('🚀 Custom Configuration Example\n');
    
    const originalFetch = global.fetch;
    
    // Test different retry configurations
    const testCases = [
        { maxRetries: 1, description: 'Quick retry (1 attempt)' },
        { maxRetries: 3, description: 'Standard retry (3 attempts)' },
        { maxRetries: 5, description: 'Persistent retry (5 attempts)' }
    ];
    
    for (const testCase of testCases) {
        console.log(`\n${testCase.description}:`);
        console.log('-'.repeat(40));
        
        global.fetch = createMockFetch(0.2); // Low success rate
        
        try {
            const startTime = Date.now();
            const result = await fetchWithRetry(
                `https://api.test.com/data-${testCase.maxRetries}`,
                testCase.maxRetries
            );
            const duration = Date.now() - startTime;
            
            console.log(`✅ Success in ${duration}ms:`, result.data);
        } catch (error) {
            console.log(`❌ Failed:`, error.message);
        }
    }
    
    // Test mock API directly
    console.log('\n3. Direct Mock API Testing:');
    console.log('='.repeat(40));
    
    console.log('Testing mock API with different success rates:');
    const rates = [0.8, 0.5, 0.2];
    
    for (const rate of rates) {
        let successes = 0;
        const totalTests = 5;
        
        for (let i = 0; i < totalTests; i++) {
            try {
                await mockApiCall(rate);
                successes++;
            } catch (error) {
                // Expected failures
            }
        }
        
        console.log(`   ${rate * 100}% success rate: ${successes}/${totalTests} successes`);
    }
    
    // Restore original fetch
    global.fetch = originalFetch;
    
    console.log('\n✨ Custom configuration example completed!');
}

// Run the example
if (require.main === module) {
    customConfigExample().catch(console.error);
}

module.exports = customConfigExample;