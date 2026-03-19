# Financial Modeling Prep MCP Server v2.0

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A modern Model Context Protocol (MCP) server for accessing financial data from Financial Modeling Prep (FMP) API. Built with the latest MCP SDK features including tools, resources, and prompts.

## Features

### 🔧 Tools (25 Total)

**Market Data**
- `get_quote` - Real-time stock quotes
- `search_symbol` - Search stocks by name or ticker
- `get_market_gainers` - Top performing stocks
- `get_market_losers` - Worst performing stocks
- `get_most_active` - Most actively traded stocks
- `get_sector_performance` - Sector performance data
- `get_sp500_constituents` - S&P 500 constituents

**Financial Statements**
- `get_company_profile` - Detailed company information
- `get_income_statement` - Income statements (annual/quarterly)
- `get_balance_sheet` - Balance sheets (annual/quarterly)
- `get_cash_flow` - Cash flow statements (annual/quarterly)
- `get_stock_news` - Latest stock news
- `get_key_metrics` - Key financial metrics (P/E, ROE, etc.)
- `get_financial_ratios` - Detailed financial ratios

**Analyst Data**
- `get_analyst_estimates` - Revenue and EPS forecasts
- `get_price_target` - Analyst price targets
- `get_analyst_ratings` - Upgrades/downgrades
- `get_insider_trading` - Insider trading activity
- `get_institutional_holders` - 13F institutional ownership

**Technical Indicators**
- `get_technical_indicator_rsi` - Relative Strength Index
- `get_technical_indicator_sma` - Simple Moving Average
- `get_technical_indicator_ema` - Exponential Moving Average
- `get_historical_chart` - Historical price data

**Calendar Data**
- `get_earnings_calendar` - Earnings announcement calendar
- `get_economic_calendar` - Economic data releases
- `get_economic_indicator` - GDP, unemployment, CPI, etc.

### 📚 Resources (5 Total)

Resources provide direct data access via URIs:

- `fmp://company/{symbol}/profile` - Company profile
- `fmp://company/{symbol}/quote` - Real-time quote
- `fmp://company/{symbol}/financials/{statement}/{period}` - Financial statements
- `fmp://market/overview` - Market overview (gainers, losers, active)
- `fmp://market/sectors/{date}` - Sector performance

### 💬 Prompts (3 Total)

Prompt templates for common analysis tasks:

- `stock_analysis` - Comprehensive stock analysis
- `portfolio_evaluation` - Portfolio diversification and risk analysis
- `earnings_preview` - Upcoming earnings preview

## Installation

```bash
npm install
npm run build
```

## Configuration

Set your FMP API key as an environment variable:

```bash
export FMP_API_KEY="your-api-key"
```

Get your API key from [Financial Modeling Prep](https://financialmodelingprep.com/)

## Usage

### Stdio Mode (Default)

```bash
# Set environment variable and run
export FMP_API_KEY="your-api-key"
npm start

# Or
FMP_API_KEY="your-api-key" node build/index.js
```

### HTTP Mode

```bash
# Start HTTP server
npm run start:http

# Or with custom port
node build/index.js --http --port=8080
```

The HTTP server provides:
- `POST /mcp` - MCP protocol endpoint
- `GET /health` - Health check
- `GET /` - Server info

### With Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS or `%APPDATA%/Claude/claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "fmp": {
      "command": "node",
      "args": ["/path/to/aigroup-fmp-mcp/build/index.js"],
      "env": {
        "FMP_API_KEY": "your-api-key"
      }
    }
  }
}
```

## Project Structure

```
aigroup-fmp-mcp/
├── src/
│   ├── index.ts          # Entry point
│   ├── server.ts         # McpServer and transport setup
│   ├── tools/            # Tool definitions
│   │   ├── index.ts      # Tool registration
│   │   ├── market.ts     # Market data tools
│   │   ├── financials.ts # Financial statement tools
│   │   ├── analysis.ts   # Analyst data tools
│   │   ├── technical.ts  # Technical indicator tools
│   │   └── calendar.ts   # Calendar data tools
│   ├── resources/        # Resource definitions
│   │   ├── index.ts      # Resource registration
│   │   └── company.ts    # Company-related resources
│   ├── prompts/          # Prompt templates
│   │   ├── index.ts      # Prompt registration
│   │   └── analysis.ts   # Analysis prompts
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   └── utils/
│       └── fmp.ts        # FMP API utilities
├── package.json
├── tsconfig.json
└── README.md
```

## API Reference

All tools use FMP's stable API endpoints. See [FMP Documentation](https://site.financialmodelingprep.com/developer/docs/stable) for more details.

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev
```

## What's New in v2.0

- **MCP SDK v1.27.1**: Uses latest `McpServer` class with `registerTool()`, `registerResource()`, and `registerPrompt()` APIs
- **Zod Schema Validation**: Type-safe parameter validation with Zod
- **Resources**: Direct data access via resource URIs
- **Prompts**: Reusable analysis templates
- **Dual Transport**: Support for both stdio and HTTP transports
- **Better TypeScript**: Full type definitions for all data structures

## Acknowledgments

This project was developed with reference to **houtini-ai/fmp-mcp**:

- Repository: https://github.com/houtini-ai/fmp-mcp
- Reference scope: overall project direction, MCP server structure, and feature organization

Thanks to **houtini-ai** for the prior open-source work that helped inform this implementation.

## License & Usage

This project is released under the **MIT License**.

You may use, copy, modify, merge, publish, distribute, sublicense, and sell copies of this software, including in commercial contexts, provided that the original copyright notice and license text are retained.

Please note:

- the software is provided **"AS IS"**, without warranty of any kind
- you must preserve the relevant copyright and permission notice in copies or substantial portions of the software
- use of the **FMP API** is still subject to Financial Modeling Prep's own service terms, quotas, billing rules, and data usage restrictions

See the full text in [LICENSE](LICENSE).
