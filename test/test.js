const { fetchWithRetry, mockApiCall, createMockFetch } = require('../src');

/**
 * Comprehensive test suite for the async fetcher
 */
async function runTests() {
    console.log('🧪 Running Async Fetcher Tests\n');
    
    let testsPassed = 0;
    let testsFailed = 0;
    
    const originalFetch = global.fetch;
    
    // Test 1: Basic functionality
    console.log('1. Basic Functionality Test:');
    console.log('='.repeat(40));
    
    global.fetch = createMockFetch(0.5);
    
    try {
        const result = await fetchWithRetry('https://api.test.com/data', 2);
        if (result && result.data) {
            console.log('✅ PASS: Basic fetch successful');
            testsPassed++;
        } else {
            console.log('❌ FAIL: Basic fetch returned invalid data');
            testsFailed++;
        }
    } catch (error) {
        console.log('❌ FAIL: Basic fetch failed:', error.message);
        testsFailed++;
    }
    
    // Test 2: Retry on failure
    console.log('\n2. Retry on Failure Test:');
    console.log('='.repeat(40));
    
    let callCount = 0;
    global.fetch = async (url) => {
        callCount++;
        await new Promise(resolve => setTimeout(resolve, 10));
        
        if (callCount < 2) {
            return { ok: false, status: 500, statusText: 'Server Error' };
        } else {
            return {
                ok: true,
                status: 200,
                json: async () => ({ data: 'Success after retry', callCount })
            };
        }
    };
    
    try {
        const result = await fetchWithRetry('https://api.retry.com/data', 3);
        if (result.callCount === 2) {
            console.log('✅ PASS: Correctly retried on failure');
            testsPassed++;
        } else {
            console.log('❌ FAIL: Retry logic incorrect');
            testsFailed++;
        }
    } catch (error) {
        console.log('❌ FAIL: Retry test failed:', error.message);
        testsFailed++;
    }
    
    // Test 3: Max retries exceeded
    console.log('\n3. Max Retries Exceeded Test:');
    console.log('='.repeat(40));
    
    global.fetch = createMockFetch(0.0); // Always fail
    
    try {
        await fetchWithRetry('https://api.failing.com/data', 2);
        console.log('❌ FAIL: Should have thrown error');
        testsFailed++;
    } catch (error) {
        if (error.message.includes('All 2 retry attempts failed')) {
            console.log('✅ PASS: Correctly threw error after max retries');
            testsPassed++;
        } else {
            console.log('❌ FAIL: Wrong error message:', error.message);
            testsFailed++;
        }
    }
    
    // Test 4: Mock API functionality
    console.log('\n4. Mock API Test:');
    console.log('='.repeat(40));
    
    try {
        const result = await mockApiCall(1.0); // Always succeed
        if (result.success) {
            console.log('✅ PASS: Mock API success case works');
            testsPassed++;
        } else {
            console.log('❌ FAIL: Mock API success case failed');
            testsFailed++;
        }
        
        try {
            await mockApiCall(0.0); // Always fail
            console.log('❌ FAIL: Mock API should have failed');
            testsFailed++;
        } catch (error) {
            if (error.message.includes('Mock API call failed')) {
                console.log('✅ PASS: Mock API failure case works');
                testsPassed++;
            } else {
                console.log('❌ FAIL: Mock API wrong error:', error.message);
                testsFailed++;
            }
        }
    } catch (error) {
        console.log('❌ FAIL: Mock API test failed:', error.message);
        testsFailed++;
    }
    
    // Restore original fetch
    global.fetch = originalFetch;
    
    // Summary
    console.log('\n📊 Test Summary:');
    console.log('='.repeat(40));
    console.log(`✅ Tests Passed: ${testsPassed}`);
    console.log(`❌ Tests Failed: ${testsFailed}`);
    console.log(`📈 Success Rate: ${((testsPassed / (testsPassed + testsFailed)) * 100).toFixed(1)}%`);
    
    if (testsFailed === 0) {
        console.log('\n🎉 All tests passed!');
    } else {
        console.log('\n💥 Some tests failed!');
        process.exit(1);
    }
}

// Run tests
if (require.main === module) {
    runTests().catch(console.error);
}

module.exports = runTests;