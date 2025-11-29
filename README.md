### 🦅 EaglePoint AI Async Fetcher – JavaScript

A lightweight JavaScript async data fetcher with retry logic.
Fetches data from URLs, retries on failure (up to a max retry count), waits 1 second between retries, and returns data or throws an error.
Includes async/await support and a mock API for testing.

# ✅ Features

🚀 Fetches data from a URL

🔁 Retries automatically on failure

⏳ Waits 1 second between retries

🛑 Throws error after all retries fail

🧩 Uses async/await

🧪 Includes mock API for controlled testing

# 📦 Installation

git clone https://github.com/kingfillari/eaglepoint-ai-async-fetcher-js
cd eaglepoint-ai-async-fetcher-js
npm install

# 📖 Usage
# Basic Usage


const { fetchWithRetry } = require('./src');

// Basic usage with default retries (3)
fetchWithRetry('https://api.example.com/data')
    .then(data => console.log('Success:', data))
    .catch(error => console.log('Failed:', error.message));
    
# Custom Retry Count


// Custom retry count (5 attempts)
fetchWithRetry('https://api.example.com/data', 5)
    .then(data => console.log('Success:', data))
    .catch(error => console.log('Failed after 5 attempts:', error.message));

# Using the Mock API

const { mockApiCall } = require('./src');

// Test with mock API (70% success rate)
mockApiCall(0.7)
    .then(result => console.log('Mock success:', result))
    .catch(error => console.log('Mock failed:', error.message));

# 🧪 Testing

npm test

# Basic usage example
npm run example:basic

# Error handling example
npm run example:error

# Custom configuration example
npm run example:custom

# 📁 Project Structure

eaglepoint-ai-async-fetcher-js/
├── src/
│   ├── fetchWithRetry.js      # Main implementation
│   └── mockApi.js             # Mock API for testing
├── examples/                  # Usage examples
├── test/                      # Test suite
└── package.json

# 🔧 API Reference

# fetchWithRetry(url, maxRetries)
Parameter	                 Type	                      Description
url	                        string	                URL to fetch data from
maxRetries           	number (optional)	        Maximum retry attempts (default: 3)

# Returns: Promise<any> — fetched data

# Throws: Error — after all retry attempts fail

# mockApiCall(successProbability)

Parameter	                      Type	                       Description
successProbability          	number (0–1)	          Probability the call succeeds

# Returns: Promise<Object> — mock response data

# Throws: Error — when simulated API call fails

# 📄 License

# Licensed under the  BSD 3-Clause License License.


Copyright 2025 EaglePoint AI. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

# 🗂️ .gitignore

# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs
*.log



### 🚀 Setup From Scratch


mkdir eaglepoint-ai-async-fetcher-js
cd eaglepoint-ai-async-fetcher-js

### Create all required files, then:###


npm install
npm test
npm run example:basic


