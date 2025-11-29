# EaglePoint AI Async Fetcher - JavaScript

JavaScript async data fetcher with retry logic. Fetches data from URLs, retries on failure (up to max retry count), waits 1 second between retries, and returns data or throws an error after all retries fail. Uses async/await with a mock API for testing.

---

## ✅ Requirements Met

- ✅ Fetches data from a URL  
- ✅ Retries on failure (up to max retry count)  
- ✅ Waits 1 second between retries  
- ✅ Returns data or throws error after all retries fail  
- ✅ Uses async/await  
- ✅ Includes mock API for testing  

---

## 🚀 Installation

```bash
git clone https://github.com/kingfillari/eaglepoint-ai-async-fetcher-js
cd eaglepoint-ai-async-fetcher-js
npm install
```

---

## 📖 Usage

### Basic Usage

```javascript
const { fetchWithRetry } = require('./src');

// Basic usage with default retries (3)
fetchWithRetry('https://api.example.com/data')
    .then(data => console.log('Success:', data))
    .catch(error => console.log('Failed:', error.message));
```

### Custom Retry Count

```javascript
// Custom retry count (5 attempts)
fetchWithRetry('https://api.example.com/data', 5)
    .then(data => console.log('Success:', data))
    .catch(error => console.log('Failed after 5 attempts:', error.message));
```

### With Mock API

```javascript
const { mockApiCall } = require('./src');

// Test with mock API (70% success rate)
mockApiCall(0.7)
    .then(result => console.log('Mock success:', result))
    .catch(error => console.log('Mock failed:', error.message));
```

---

### 🧪 Testing

```bash
# Run the test suite
npm test

# Run examples
npm run example:basic
npm run example:error
npm run example:custom
```

---

### 📁 Project Structure

```
eaglepoint-ai-async-fetcher-js/
├── src/
│   ├── fetchWithRetry.js    # Main implementation
│   └── mockApi.js           # Mock API for testing
├── examples/                # Usage examples
├── test/                    # Test suite
└── package.json
```

---

### 🔧 API Reference

fetchWithRetry(url, maxRetries)

- url (string) – The URL to fetch data from  
- maxRetries (number, optional) – Maximum retry attempts (default: 3)  
- Returns: Promise<any> – Fetched data  
- Throws: Error – After all retry attempts fail

mockApiCall(successProbability)

- successProbability (number, optional) – Probability of success (0–1, default: 0.5)  
- Returns: Promise<Object> – Mock response data  
- Throws: Error – When the mock API call fails

---

## 📄 License

MIT License

Copyright (c) 2025 EaglePoint AI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## .gitignore (recommended entries)

```
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
```

---

🚀 Setup Instructions

```bash
mkdir eaglepoint-ai-async-fetcher-js
cd eaglepoint-ai-async-fetcher-js
# Create all the files with the content above

npm install
npm test
npm run example:basic
```