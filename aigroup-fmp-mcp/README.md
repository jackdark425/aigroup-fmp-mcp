# AIGroup FMP MCP Server

[![npm version](https://img.shields.io/npm/v/aigroup-fmp-mcp.svg)](https://www.npmjs.com/package/aigroup-fmp-mcp)

A Model Context Protocol (MCP) implementation for Financial Modeling Prep, enabling AI assistants to access and analyze financial data, stock information, company fundamentals, and market insights.

## Table of Contents

- [AIGroup FMP MCP Server](#aigroup-fmp-mcp-server)
  - [Table of Contents](#table-of-contents)
  - [Quick Start](#quick-start)
    - [🚀 Option 1: Use Our Hosted Instance (Fastest)](#-option-1-use-our-hosted-instance-fastest)
    - [🏠 Option 2: Self-Host Your Own Instance (Full Control)](#-option-2-self-host-your-own-instance-full-control)
  - [Features](#features)
  - [Deployment Options](#deployment-options)
    - [📡 **Using Our Hosted Instance** (Recommended for Quick Start)](#-using-our-hosted-instance-recommended-for-quick-start)
    - [🛠️ **Self-Hosting** (For Production Use)](#️-self-hosting-for-production-use)
      - [Installation Methods](#installation-methods)
      - [Environment Variables](#environment-variables)
      - [Server Modes](#server-modes)
      - [Configuration Precedence](#configuration-precedence)
  - [HTTP Server \& Local Development](#http-server--local-development)
    - [Health Endpoints](#health-endpoints)
  - [Making HTTP Requests](#making-http-requests)
    - [Session Configuration](#session-configuration)
    - [Request Examples](#request-examples)
  - [Available Tools](#available-tools)
    - [Quotes and Price Data](#quotes-and-price-data)
    - [Company Information](#company-information)
    - [Financial Statements](#financial-statements)
  - [Obtaining a Financial Modeling Prep Access Token](#obtaining-a-financial-modeling-prep-access-token)
  - [Contributing](#contributing)
    - [Development Setup](#development-setup)
    - [Running Tests](#running-tests)
  - [Issues and Bug Reports](#issues-and-bug-reports)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Quick Start

Choose your deployment option:

### 🚀 Option 1: Use Our Hosted Instance (Fastest)

**No installation required!**

1. **Get FMP API Key**: [Sign up at FMP](https://financialmodelingprep.com/developer/docs)
2. **Connect to our endpoint**: `https://your-hosted-endpoint.com/mcp`
3. **Provide API key** in session configuration
4. **Start using** 5 meta-tools to load toolsets dynamically

**Available via:**
- **Direct HTTP connection** (recommended)
- **MCP registries** like Smithery.ai, Glama.ai, Contexaai.com

**Example session config:**
```json
{
  "FMP_ACCESS_TOKEN": "your_fmp_api_key_here"
}
```

---

### 🏠 Option 2: Self-Host Your Own Instance (Full Control)

**Choose your mode and deploy:**

**NPM Installation:**
```bash
npm install -g aigroup-fmp-mcp
export FMP_ACCESS_TOKEN=your_token_here
export DYNAMIC_TOOL_DISCOVERY=true  # or choose static/legacy
aigroup-fmp-mcp
```

**Docker (build from source):**
```bash
git clone https://github.com/aigroup/aigroup-fmp-mcp
cd aigroup-fmp-mcp
docker build -t aigroup-fmp-mcp .
docker run -p 8080:8080 \
  -e FMP_ACCESS_TOKEN=your_token_here \
  -e DYNAMIC_TOOL_DISCOVERY=true \
  aigroup-fmp-mcp
```

See [Installation Methods](#installation-methods) for detailed self-hosting options.

---

## Features

- **Powered by Toolception**: Built on [toolception](https://www.npmjs.com/package/toolception) for robust server orchestration and dynamic tool management
- **5 Meta-Tools in Dynamic Mode**: `enable_toolset`, `disable_toolset`, `list_toolsets`, `describe_toolset`, `list_tools`
- **Comprehensive Coverage**: Access to 250+ financial tools across 24 categories
- **Flexible Deployment**: Use our hosted instance or self-host with full control
- **Tool Set Filtering**: Load only the tools you need to reduce complexity and improve performance
- **Dynamic Tool Loading**: Runtime enable/disable of tool categories via meta-tools
- **Real-time Data**: Live stock quotes, market data, and financial information
- **Financial Statements**: Income statements, balance sheets, cash flow statements, and financial ratios
- **Market Analysis**: Technical indicators, analyst estimates, and market performance metrics
- **Economic Data**: Treasury rates, economic indicators, and macroeconomic information
- **Alternative Data**: ESG scores, insider trading, congressional trading, and social sentiment

## Deployment Options

This server can be used in two ways:

### 📡 **Using Our Hosted Instance** (Recommended for Quick Start)

**Direct HTTP Endpoint:**
```
https://your-hosted-endpoint.com/mcp
```

**Also available through MCP registries:**
- Smithery.ai: [View on Smithery](https://smithery.ai/server/@aigroup/aigroup-fmp-mcp)
- Glama.ai, Contexaai.com (see [Registries](#registries) section)

**Configuration:**
- Runs in **dynamic mode** (5 meta-tools: `enable_toolset`, `disable_toolset`, `list_toolsets`, `describe_toolset`, `list_tools`)
- Requires FMP API key in **session configuration** (not server environment)
- No server-side setup needed - just connect and use

---

### 🛠️ **Self-Hosting** (For Production Use)

Self-hosting gives you full control over:
- **Data privacy**: All API calls go through your infrastructure
- **Rate limiting**: Control your own FMP API usage
- **Customization**: Modify tools, add caching, or integrate with internal systems
- **Reliability**: No dependency on external service availability

#### Installation Methods

**1. NPM Installation (Recommended for Developers)**

```bash
# Install globally
npm install -g aigroup-fmp-mcp

# Or use with npx (no installation needed)
npx aigroup-fmp-mcp --help
```

**2. Docker Installation**

```bash
# Pull from registry (when published)
docker pull aigroup/aigroup-fmp-mcp:latest

# Or build from source
docker build -t aigroup-fmp-mcp .
```

**3. Source Installation**

```bash
git clone https://github.com/aigroup/aigroup-fmp-mcp
cd aigroup-fmp-mcp
npm install
npm run build
npm start
```

#### Environment Variables

| Variable | Type | Required | Description |
|----------|------|----------|-------------|
| `FMP_ACCESS_TOKEN` | string | Yes* | Your Financial Modeling Prep API key |
| `PORT` | number | No | Server port (default: 8080) |
| `DYNAMIC_TOOL_DISCOVERY` | boolean | No | Enable dynamic mode (default: true) |
| `STATIC_TOOL_SETS` | string | No | Comma-separated tool set keys for static mode |
| `ALL_TOOLS` | boolean | No | Expose all tools directly |

*Required unless using session-level configuration

#### Server Modes

**1. Dynamic Tool Discovery (Default)**
- Meta-tools enabled for runtime toolset management
- Tools loaded on-demand
- Best for: Flexible usage, testing different toolsets

**2. Static Tool Sets**
- Pre-configured toolsets from environment/CLI
- Predictable tool exposure
- Best for: Production deployments with known requirements

**3. All Tools**
- All available tools exposed directly
- No toolset management needed
- Best for: Simple deployments, maximum functionality

#### Configuration Precedence

1. **CLI Arguments** (highest priority)
   ```bash
   npx aigroup-fmp-mcp --port 3000 --fmp-token your_token --dynamic-tool-discovery
   ```

2. **Environment Variables**
   ```bash
   export FMP_ACCESS_TOKEN=your_token
   export STATIC_TOOL_SETS=quotes,company,statements
   ```

3. **Session Configuration** (per-request)
   ```json
   {
     "FMP_ACCESS_TOKEN": "user_specific_token"
   }
   ```

---

## HTTP Server & Local Development

The server runs an HTTP endpoint that speaks the Model Context Protocol. You can test it locally:

```bash
# Start the server
npx aigroup-fmp-mcp --port 8080 --fmp-token your_token

# Test health endpoint
curl http://localhost:8080/health

# Test ping endpoint
curl http://localhost:8080/ping

# Get server card information
curl http://localhost:8080/server-card
```

### Health Endpoints

- `GET /health` - Server health check with uptime and version
- `GET /ping` - Simple liveness probe (returns `{"ping":"pong"}`)
- `GET /server-card` - Server metadata and capabilities

---

## Making HTTP Requests

### Session Configuration

When connecting to the MCP server, you can provide session-specific configuration via:

1. **Query Parameter** (base64 encoded JSON):
   ```
   ?config=eyJGTVBfQUNDRVNTX1RPS0VUIjoiWW91cl9iYXNlNjRfYXBpX3Rva2VuIn0=
   ```

2. **HTTP Header**:
   ```
   X-Session-Config: {"FMP_ACCESS_TOKEN":"your_token"}
   ```

### Request Examples

**Using curl with SSE:**
```bash
curl -N -H "Accept: text/event-stream" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test-client","version":"1.0.0"}}}' \
  http://localhost:8080/mcp
```

---

## Available Tools

### Quotes and Price Data

- `getQuote` - Get real-time stock quote
- `getBatchQuotes` - Get batch quotes for multiple symbols
- `getHistoricalPrices` - Get historical price data
- `getSMA` - Get simple moving average (SMA)
- `getRSI` - Get relative strength index (RSI)
- `getSupportedIndicators` - Get supported technical indicators

### Company Information

- `getProfile` - Get company profile
- `getExecutives` - Get company executives
- `getRatings` - Get company ratings
- `getNews` - Get company news
- `searchCompanies` - Search for companies
- `getExchanges` - Get available exchanges

### Financial Statements

- `getIncomeStatement` - Get income statement
- `getBalanceSheet` - Get balance sheet
- `getCashFlow` - Get cash flow statement
- `getRatios` - Get financial ratios
- `getKeyMetrics` - Get key metrics

---

## Obtaining a Financial Modeling Prep Access Token

1. Visit [Financial Modeling Prep](https://financialmodelingprep.com/developer/docs)
2. Sign up for a free account
3. Navigate to your dashboard
4. Copy your API key
5. Use it in your configuration:

```bash
export FMP_ACCESS_TOKEN=your_api_key_here
```

**Note:** The free tier has rate limits. Consider upgrading to a paid plan for production use.

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/aigroup/aigroup-fmp-mcp
cd aigroup-fmp-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode with hot reload
npm run dev

# Run tests
npm test

# Type checking
npm run typecheck
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests once (no watch mode)
npm run test:run

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- path/to/test.ts
```

---

## Issues and Bug Reports

If you encounter any issues or have suggestions, please [open an issue](https://github.com/aigroup/aigroup-fmp-mcp/issues) on GitHub.

When reporting issues, please include:
- Server version (`npm list aigroup-fmp-mcp`)
- Node.js version (`node --version`)
- Operating system
- Steps to reproduce
- Relevant logs

---

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Built with [toolception](https://www.npmjs.com/package/toolception) for dynamic MCP server orchestration
- Powered by [Financial Modeling Prep API](https://financialmodelingprep.com/developer/docs)
- Implements the [Model Context Protocol](https://modelcontextprotocol.io/) specification
