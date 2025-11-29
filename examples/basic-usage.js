const { fetchWithRetry, createMockFetch } = require('../src');

/**
 * Basic usage example demonstrating the core functionality
 */
async function basicUsageExample() {
    console.log('🚀 Basic Usage Example\n');
    
    // Replace global fetch with mock for testing
    const originalFetch = global.fetch;
    global.fetch = createMockFetch(0.3); // 30% success rate
    
    try {
        console.log('Testing fetchWithRetry with low success rate (30%):');
        console.log('='.repeat(50));
        
        const result = await fetchWithRetry('https://api.example.com/data', 3);
        console.log('✅ Final result:', result);
        
    } catch (error) {
        console.log('❌ All attempts failed:', error.message);
    } finally {
        // Restore original fetch
        global.fetch = originalFetch;
    }
    
    console.log('\n✨ Basic example completed!');
}

// Run the example
if (require.main === module) {
    basicUsageExample().catch(console.error);
}

module.exports = basicUsageExample;