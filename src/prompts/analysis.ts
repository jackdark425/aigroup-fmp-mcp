/**
 * Analysis Prompts
 * 
 * Prompts provide reusable templates for LLM interactions
 */

import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * Register Stock Analysis Prompt
 * 
 * A comprehensive prompt for analyzing a stock
 */
function registerStockAnalysisPrompt(server: McpServer) {
  server.registerPrompt(
    'stock_analysis',
    {
      title: 'Stock Analysis',
      description: 'Generate a comprehensive stock analysis report',
      argsSchema: {
        symbol: z.string().describe('Stock ticker symbol to analyze'),
        focus: z.enum(['fundamental', 'technical', 'both']).optional().describe('Analysis focus area'),
      },
    },
    async (args: { symbol: string; focus?: 'fundamental' | 'technical' | 'both' }) => {
      const focus = args.focus || 'both';
      
      const fundamentalSection = focus === 'fundamental' || focus === 'both'
        ? `- Company profile and business overview
- Recent financial statements (income, balance sheet, cash flow)
- Key financial metrics and ratios
- Analyst estimates and price targets
- Recent insider trading activity`
        : '';
      
      const technicalSection = focus === 'technical' || focus === 'both'
        ? `- Current stock quote and price action
- Recent price trends and support/resistance levels
- Technical indicators if relevant`
        : '';
      
      const section1 = '1. Executive Summary';
      const section2 = '2. Company Overview';
      
      let section3 = '';
      let section4 = '';
      let section5 = '';
      let section6 = '';
      let section7 = '';
      let section8 = '';
      
      if (focus === 'fundamental') {
        section3 = '3. Financial Health Analysis';
        section4 = '4. Valuation Metrics';
        section5 = '5. Analyst Sentiment';
        section6 = '6. Investment Thesis & Risks';
        section7 = '7. Conclusion';
      } else if (focus === 'technical') {
        section3 = '3. Technical Analysis';
        section4 = '4. Investment Thesis & Risks';
        section5 = '5. Conclusion';
      } else {
        section3 = '3. Financial Health Analysis';
        section4 = '4. Valuation Metrics';
        section5 = '5. Analyst Sentiment';
        section6 = '6. Technical Analysis';
        section7 = '7. Investment Thesis & Risks';
        section8 = '8. Conclusion';
      }
      
      const structure = [section1, section2, section3, section4, section5];
      if (section6) structure.push(section6);
      if (section7) structure.push(section7);
      if (section8) structure.push(section8);
      
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Please provide a comprehensive ${focus} analysis for ${args.symbol.toUpperCase()}. 

Use the available tools to gather:
${fundamentalSection}
${technicalSection}

Structure your analysis with:
${structure.join('\n')}

Please provide actionable insights and key metrics to watch.`,
            },
          },
        ],
      };
    }
  );
}

/**
 * Register Portfolio Evaluation Prompt
 * 
 * A prompt for evaluating a portfolio of stocks
 */
function registerPortfolioEvaluationPrompt(server: McpServer) {
  server.registerPrompt(
    'portfolio_evaluation',
    {
      title: 'Portfolio Evaluation',
      description: 'Evaluate a portfolio of stocks for diversification and risk',
      argsSchema: {
        symbols: z.string().describe('Comma-separated list of stock symbols in the portfolio'),
        context: z.string().optional().describe('Additional context about investment goals or risk tolerance'),
      },
    },
    async (args: { symbols: string; context?: string }) => {
      const symbols = args.symbols.split(',').map(s => s.trim().toUpperCase());
      const contextText = args.context ? `Context: ${args.context}` : '';
      
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Please evaluate the following portfolio: ${symbols.join(', ')}

${contextText}

For each holding, gather:
- Current quote and performance metrics
- Company profile (sector, industry, market cap)
- Key financial ratios
- Recent price performance

Then provide:
1. Portfolio Overview - Summary of all holdings
2. Sector/Industry Diversification Analysis
   - Distribution across sectors
   - Concentration risks
3. Market Cap Distribution - Large/mid/small cap breakdown
4. Risk Assessment
   - Individual position risks
   - Portfolio-level risks
   - Correlation considerations
5. Performance Snapshot
   - Current gains/losses
   - Relative performance
6. Recommendations
   - Rebalancing suggestions
   - Diversification opportunities
   - Risk mitigation strategies

Please be specific with metrics and percentages where possible.`,
            },
          },
        ],
      };
    }
  );
}

/**
 * Register Earnings Preview Prompt
 * 
 * A prompt for analyzing upcoming earnings
 */
function registerEarningsPreviewPrompt(server: McpServer) {
  server.registerPrompt(
    'earnings_preview',
    {
      title: 'Earnings Preview',
      description: 'Preview upcoming earnings for a stock',
      argsSchema: {
        symbol: z.string().describe('Stock ticker symbol'),
      },
    },
    async (args: { symbol: string }) => {
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Please provide an earnings preview for ${args.symbol.toUpperCase()}.

Gather and analyze:
1. Earnings Calendar - When is the next earnings report?
2. Analyst Estimates - What are the consensus estimates for revenue and EPS?
3. Historical Performance - How has the company performed vs. estimates in recent quarters?
4. Recent News - Any significant news that might impact earnings?
5. Key Metrics to Watch - What metrics are most important for this company?

Provide your outlook:
- Likelihood of beating/missing estimates
- Key factors that could drive surprises
- Potential market reaction scenarios

Include specific numbers and percentages where available.`,
            },
          },
        ],
      };
    }
  );
}

/**
 * Register all prompts with the MCP server
 */
export function registerAnalysisPrompts(server: McpServer) {
  registerStockAnalysisPrompt(server);
  registerPortfolioEvaluationPrompt(server);
  registerEarningsPreviewPrompt(server);
}
