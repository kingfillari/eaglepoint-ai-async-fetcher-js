// Main entry point - export all functionality
const fetchWithRetry = require('./fetchWithRetry');
const { mockApiCall, createMockFetch } = require('./mockApi');

module.exports = {
    fetchWithRetry,
    mockApiCall,
    createMockFetch
};