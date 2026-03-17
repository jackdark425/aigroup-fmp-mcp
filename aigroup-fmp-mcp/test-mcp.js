// Simple MCP client test script
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function testMCP() {
  console.log('Testing MCP connection...');
  
  try {
    // Connect to the server
    const client = new Client(
      {
        name: 'test-client',
        version: '1.0.0',
      },
      {
        capabilities: {},
      }
    );

    // Use stdio transport to connect to the running server
    const transport = new StdioClientTransport({
      command: 'node',
      args: ['d:/aigroup-fmp-mcp/aigroup-fmp-mcp/dist/index.js'],
      env: {
        FMP_ACCESS_TOKEN: 'cmX5gppx1GavfV04ZhCWuII3WvwgexFV'
      }
    });

    await client.connect(transport);
    console.log('✅ Connected to MCP server');

    // List available tools
    const toolsResponse = await client.listTools();
    console.log(`✅ Found ${toolsResponse.tools.length} tools:`);
    toolsResponse.tools.forEach(tool => {
      console.log(`  - ${tool.name}: ${tool.description}`);
    });

    // Test a simple tool call if we have tools
    if (toolsResponse.tools.length > 0) {
      const testTool = toolsResponse.tools[0];
      console.log(`\nTesting tool: ${testTool.name}`);
      
      try {
        const result = await client.callTool({
          name: testTool.name,
          arguments: {}
        });
        console.log('✅ Tool call result:', result);
      } catch (error) {
        console.log('❌ Tool call failed (expected for empty args):', error.message);
      }
    }

    await client.close();
    console.log('\n✅ Test completed successfully');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testMCP();
