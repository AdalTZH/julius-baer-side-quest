# Core Banking API Client - JavaScript Implementation

Modern JavaScript client for the Core Banking API, refactored from the original bash script (`demo_curls_no_jq.sh`). This implementation demonstrates current JavaScript best practices using ES6+ features, async/await, and the native fetch API.

## 🚀 Features

- **Modern JavaScript**: ES6+ syntax with async/await patterns
- **Native Fetch API**: No external HTTP libraries required
- **Structured Code**: Modular architecture with separate concerns
- **Error Handling**: Comprehensive error handling for all API operations
- **Type Safety**: Clear parameter types and return values
- **Environment Configuration**: Supports environment variables

## 📋 Prerequisites

- **Node.js**: Version 14.0.0 or higher (Node 18+ recommended for native fetch support)
- **Banking API Server**: The provided test server (`core-banking-api.jar`) must be running for testing
  - **Note**: You don't need to write Java - this is just a pre-built test server provided by the challenge organizers

## 🔧 Setup

1. **Navigate to the project directory**:
   ```bash
   cd submissions/my-github-id
   ```

2. **Install dependencies** (none required, but you can use npm/yarn for future dependencies):
   ```bash
   npm install
   ```

3. **Configure environment** (optional):
   ```bash
   cp .env.example .env
   # Edit .env to set BASE_URL if different from default
   ```

4. **Start the test server** (pre-built, no Java coding required):
   ```bash
   # The server is a pre-built JAR file provided by the challenge organizers
   # You just need to run it to test your JavaScript client
   cd server
   java -jar core-banking-api.jar
   # Server will run on http://localhost:8123
   ```
   
   **Alternative**: Use Docker (if you prefer):
   ```bash
   docker run -d -p 8123:8123 singhacksbjb/sidequest-server:latest
   ```

## 🎯 Usage

### Run the Demo Script

```bash
npm start
# or
node src/demo.js
```

### With Custom Base URL

```bash
BASE_URL=http://localhost:8080 node src/demo.js
```

### Using Environment File

Create a `.env` file:
```
BASE_URL=http://localhost:8123
```

Then run:
```bash
# Note: This requires a dotenv package if you want to load .env automatically
# For now, use: BASE_URL=... node src/demo.js
node src/demo.js
```

## 📁 Project Structure

```
submissions/my-github-id/
├── src/
│   ├── api/
│   │   ├── BankingApiClient.js    # Main API client class
│   │   └── endpoints.js           # API endpoint constants
│   ├── utils/
│   │   ├── logger.js               # Logging utility
│   │   └── formatters.js           # Output formatting helpers
│   └── demo.js                     # Main demo script
├── package.json                    # Node.js configuration
├── README.md                       # This file
└── .env.example                    # Environment variables template
```

## 🏗️ Architecture

### BankingApiClient

The main API client class that handles all HTTP requests:

```javascript
const client = new BankingApiClient('http://localhost:8123');

// Get authentication token
const token = await client.getAuthToken('enquiry', 'alice', 'any');

// List accounts
const accounts = await client.listAccounts();

// Validate account
const isValid = await client.validateAccount('ACC1000');

// Get balance
const balance = await client.getAccountBalance('ACC1000');

// Transfer funds
const transfer = await client.transferFunds('ACC1000', 'ACC1001', 50.00);
```

### API Methods

- **`getAuthToken(claim, username, password)`**: Get JWT token with specified scope
- **`listAccounts()`**: Retrieve all available accounts
- **`validateAccount(accountId)`**: Validate if an account exists and is valid
- **`getAccountBalance(accountId)`**: Get the current balance of an account
- **`transferFunds(fromAccount, toAccount, amount)`**: Transfer funds between accounts

## 🔄 Migration from Bash Script

This JavaScript implementation maintains 100% feature parity with the original bash script:

| Bash Script Feature | JavaScript Equivalent |
|---------------------|----------------------|
| `curl` commands | `fetch` API |
| `echo` statements | `console.log` via logger utility |
| Helper functions | ES6 modules (`logger.js`, `formatters.js`) |
| Environment variables | `process.env` with defaults |
| Sequential execution | `async/await` pattern |
| Error handling (`set -euo pipefail`) | Try/catch blocks |

## ✨ Improvements Over Bash Script

1. **Type Safety**: Clear function signatures and parameter types
2. **Error Handling**: Structured error handling with try/catch
3. **Modularity**: Separated concerns into reusable modules
4. **Maintainability**: Easier to extend and modify
5. **Testing**: Can be unit tested with Jest or similar frameworks
6. **JSON Parsing**: Built-in JSON parsing (replaces jq dependency)

## 🧪 Testing

**Your JavaScript code is complete!** It's a standalone client that connects to the test server.

To test, you need the provided test server running (it's a pre-built JAR - you don't write any Java):

```bash
# Start the server (in another terminal)
cd server
java -jar core-banking-api.jar

# Run the demo
cd submissions/my-github-id
npm start
```

## 📝 API Endpoints Used

- `POST /authToken?claim={enquiry|transfer}` - Get authentication token
- `GET /accounts` - List all accounts
- `GET /accounts/validate/{id}` - Validate account
- `GET /accounts/balance/{id}` - Get account balance
- `POST /transfer` - Transfer funds between accounts

## 🔍 Error Handling

The implementation handles:
- **Network errors**: Connection failures, timeouts
- **HTTP errors**: 4xx, 5xx status codes
- **Invalid responses**: Malformed JSON, unexpected formats
- **Graceful degradation**: Continues demo even if some requests fail

## 🎨 Output Format

The output matches the original bash script format:
- Section headers with decorative separators
- Test case headers
- Clear error messages
- Summary section with checkmarks

## 📦 Dependencies

**None required!** This implementation uses only Node.js built-in features:
- Native `fetch` API (Node 18+) or can use `node-fetch` for older versions
- ES6 modules (native in Node 14+)
- No external HTTP libraries needed

## 🚧 Future Enhancements

Potential improvements (not implemented):
- Unit and integration tests
- CLI argument parsing
- Verbose/quiet modes
- Configuration file support
- Request/response logging
- Retry logic with exponential backoff
- Connection pooling
- JWT token caching and refresh

## 📄 License

ISC

## 👤 Author

Refactored from bash script as part of the Core Banking API modernization challenge.

---

**Note**: This is a modernization of the `demo_curls_no_jq.sh` bash script, demonstrating how legacy shell scripts can be upgraded to modern, maintainable JavaScript code.