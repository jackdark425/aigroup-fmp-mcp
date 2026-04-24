# Financial Modeling Prep MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MCP SDK](https://img.shields.io/badge/MCP%20SDK-1.27.1-blue.svg)](https://github.com/modelcontextprotocol/typescript-sdk)
[![Version](https://img.shields.io/badge/version-2.0.3-brightgreen.svg)](https://github.com/jackdark425/aigroup-fmp-mcp)

> MCP server for Financial Modeling Prep (FMP) market data, built with the modern MCP SDK tool/resource/prompt model.

## Overview

`aigroup-fmp-mcp` provides a structured MCP interface over the Financial Modeling Prep API for:

- real-time quotes and symbol lookup
- company profiles and financial statements
- analyst estimates and ratings
- technical indicators and historical charts
- earnings / economic calendar workflows
- reusable MCP resources and prompts for analysis tasks

## Highlights

- **25 MCP tools** covering market data, financials, analyst workflows, technical indicators, and calendar data
- **Resources support** for direct URI-based access patterns
- **Prompt templates** for stock analysis, portfolio review, and earnings preview
- **Full stdio MCP support** with optional HTTP health/info endpoints
- **Zod validation** for safer input handling
- **Built on MCP SDK 1.27.1** with modern `McpServer` APIs

## Quick Start

### Requirements

- Node.js >= 18
- npm
- A valid FMP API key

### Run with local source

```bash
git clone https://github.com/jackdark425/aigroup-fmp-mcp.git
cd aigroup-fmp-mcp
npm install
npm run build
export FMP_API_KEY="your-api-key"
npm start
```

### HTTP mode

```bash
export FMP_API_KEY="your-api-key"
npm run start:http
```

By default, the HTTP server exposes:

- `POST /mcp` — returns `501` in this build
- `GET /health` — health check
- `GET /` — server info

HTTP mode in the current build is intended for health checks and service metadata only. Use stdio mode for MCP tools, resources, and prompts.

## Configuration

Set your API key before starting the server:

```bash
export FMP_API_KEY="your-api-key"
```

Get your key from [Financial Modeling Prep](https://financialmodelingprep.com/).

## MCP Client Configuration

### Claude Desktop / compatible MCP clients

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

## Tools

### Market Data
- `get_quote`
- `search_symbol`
- `get_market_gainers`
- `get_market_losers`
- `get_most_active`
- `get_sector_performance`
- `get_sp500_constituents`

### Financial Statements
- `get_company_profile`
- `get_income_statement`
- `get_balance_sheet`
- `get_cash_flow`
- `get_stock_news`
- `get_key_metrics`
- `get_financial_ratios`

### Analyst Data
- `get_analyst_estimates`
- `get_price_target`
- `get_analyst_ratings`
- `get_insider_trading`
- `get_institutional_holders`

### Technical Indicators
- `get_technical_indicator_rsi`
- `get_technical_indicator_sma`
- `get_technical_indicator_ema`
- `get_historical_chart`

### Calendar Data
- `get_earnings_calendar`
- `get_economic_calendar`
- `get_economic_indicator`

## Resources

- `fmp://company/{symbol}/profile`
- `fmp://company/{symbol}/quote`
- `fmp://company/{symbol}/financials/{statement}/{period}`
- `fmp://market/overview`
- `fmp://market/sectors/{date}`

## Prompts

- `stock_analysis`
- `portfolio_evaluation`
- `earnings_preview`

## Project Structure

```text
aigroup-fmp-mcp/
├── src/
│   ├── index.ts
│   ├── server.ts
│   ├── tools/
│   ├── resources/
│   ├── prompts/
│   ├── types/
│   └── utils/
├── package.json
├── tsconfig.json
└── README.md
```

## Development

```bash
npm install
npm run build
npm run dev
```

## API Reference

All tools map to FMP endpoints. See the official docs:

- [FMP API Documentation](https://site.financialmodelingprep.com/developer/docs/stable)

## Acknowledgments

### Reference Project

- **houtini-ai/fmp-mcp**
  - Repository: https://github.com/houtini-ai/fmp-mcp
  - Reference scope: overall project direction, MCP server structure, and feature organization

Thanks to **houtini-ai** for the prior open-source work that helped inform this implementation.

## License & Usage

This project is released under the **MIT License**.

You may use, copy, modify, merge, publish, distribute, sublicense, and sell copies of this software, including in commercial contexts, provided that the original copyright notice and license text are retained.

Please note:

- the software is provided **"AS IS"**, without warranty of any kind
- you must preserve the relevant copyright and permission notice in copies or substantial portions of the software
- use of the **FMP API** remains subject to Financial Modeling Prep's own terms of service, quotas, billing rules, and data usage restrictions

See the full text in [LICENSE](LICENSE).

## Support

- Issues: https://github.com/jackdark425/aigroup-fmp-mcp/issues
- Repository: https://github.com/jackdark425/aigroup-fmp-mcp
