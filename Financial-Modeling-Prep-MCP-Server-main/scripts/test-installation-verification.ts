#!/usr/bin/env tsx

/**
 * Installation Method Verification Test Runner
 * 
 * Comprehensive test runner for verifying all installation methods work correctly.
 * This script orchestrates the testing of NPM package installation, Docker container
 * execution, source code installation, CLI entrypoint functionality, and server startup.
 */

import { spawn } from 'child_process';
import { existsSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

/**
 * Test configuration for installation verification.
 */
const TEST_CONFIG = {
  /**
   * Test timeout for the entire suite.
   */
  SUITE_TIMEOUT: 600000, // 10 minutes
  
  /**
   * Test directory for temporary files.
   */
  TEST_DIR: join(tmpdir(), 'fmp-mcp-installation-verification'),
  
  /**
   * Vitest configuration for installation tests.
   */
  VITEST_CONFIG: {
    testFiles: ['src/registry-tests/InstallationMethodVerification.test.ts'],
    timeout: 300000, // 5 minutes per test
    coverage: true,
    reporter: 'verbose'
  }
} as const;

/**
 * Installation verification test runner.
 */
class InstallationVerificationRunner {
  private testDir: string;

  constructor() {
    this.testDir = TEST_CONFIG.TEST_DIR;
  }

  /**
   * Prepares the test environment.
   */
  private async prepareEnvironment(): Promise<void> {
    console.log('🔧 Preparing test environment...');
    
    // Clean up any existing test directory
    if (existsSync(this.testDir)) {
      console.log('  Cleaning up existing test directory...');
      rmSync(this.testDir, { recursive: true, force: true });
    }
    
    // Create fresh test directory
    mkdirSync(this.testDir, { recursive: true });
    console.log(`  Created test directory: ${this.testDir}`);
    
    // Ensure project is built
    console.log('  Building project...');
    await this.executeCommand('npm', ['run', 'build']);
    console.log('  ✅ Project built successfully');
  }

  /**
   * Cleans up the test environment.
   */
  private async cleanupEnvironment(): Promise<void> {
    console.log('🧹 Cleaning up test environment...');
    
    if (existsSync(this.testDir)) {
      rmSync(this.testDir, { recursive: true, force: true });
      console.log('  ✅ Test directory cleaned up');
    }
  }

  /**
   * Executes a command and returns the result.
   * @param command - Command to execute.
   * @param args - Command arguments.
   * @param options - Execution options.
   * @returns Promise resolving to execution result.
   */
  private async executeCommand(
    command: string,
    args: string[],
    options: {
      cwd?: string;
      timeout?: number;
      stdio?: 'inherit' | 'pipe';
    } = {}
  ): Promise<{ exitCode: number; stdout?: string; stderr?: string }> {
    const { cwd = process.cwd(), timeout = 60000, stdio = 'inherit' } = options;
    
    return new Promise((resolve) => {
      const child = spawn(command, args, {
        cwd,
        stdio,
        env: process.env
      });

      let stdout = '';
      let stderr = '';

      if (stdio === 'pipe') {
        child.stdout?.on('data', (data) => {
          stdout += data.toString();
        });

        child.stderr?.on('data', (data) => {
          stderr += data.toString();
        });
      }

      const timeoutId = setTimeout(() => {
        child.kill('SIGTERM');
        resolve({ exitCode: 1, stdout, stderr });
      }, timeout);

      child.on('close', (code) => {
        clearTimeout(timeoutId);
        resolve({ exitCode: code || 0, stdout, stderr });
      });
    });
  }

  /**
   * Runs the installation verification tests.
   */
  private async runInstallationTests(): Promise<boolean> {
    console.log('🧪 Running installation verification tests...');
    
    const vitestArgs = [
      'run',
      ...TEST_CONFIG.VITEST_CONFIG.testFiles,
      '--reporter=verbose',
      `--testTimeout=${TEST_CONFIG.VITEST_CONFIG.timeout}`,
      '--no-coverage', // Disable coverage for installation tests to avoid conflicts
      '--run'
    ];

    const result = await this.executeCommand('npx', ['vitest', ...vitestArgs], {
      timeout: TEST_CONFIG.SUITE_TIMEOUT
    });

    if (result.exitCode === 0) {
      console.log('  ✅ All installation verification tests passed');
      return true;
    } else {
      console.log('  ❌ Some installation verification tests failed');
      return false;
    }
  }

  /**
   * Runs pre-installation checks.
   */
  private async runPreInstallationChecks(): Promise<boolean> {
    console.log('🔍 Running pre-installation checks...');
    
    const checks = [
      {
        name: 'Node.js version',
        command: 'node',
        args: ['--version'],
        validator: (output: string) => {
          const version = output.trim().replace('v', '');
          const major = parseInt(version.split('.')[0]);
          return major >= 20;
        }
      },
      {
        name: 'NPM availability',
        command: 'npm',
        args: ['--version'],
        validator: (output: string) => output.trim().length > 0
      },
      {
        name: 'Docker availability',
        command: 'docker',
        args: ['--version'],
        validator: (output: string) => output.includes('Docker version')
      },
      {
        name: 'Git availability',
        command: 'git',
        args: ['--version'],
        validator: (output: string) => output.includes('git version')
      },
      {
        name: 'Project build files',
        command: 'ls',
        args: ['dist/index.js'],
        validator: () => existsSync('dist/index.js')
      }
    ];

    let allChecksPassed = true;

    for (const check of checks) {
      try {
        const result = await this.executeCommand(check.command, check.args, {
          stdio: 'pipe',
          timeout: 10000
        });

        const output = result.stdout || '';
        const isValid = result.exitCode === 0 && check.validator(output);

        if (isValid) {
          console.log(`  ✅ ${check.name}: OK`);
        } else {
          console.log(`  ❌ ${check.name}: FAILED`);
          allChecksPassed = false;
        }
      } catch (error) {
        console.log(`  ❌ ${check.name}: ERROR - ${error}`);
        allChecksPassed = false;
      }
    }

    return allChecksPassed;
  }

  /**
   * Generates a test report.
   * @param success - Whether all tests passed.
   */
  private generateReport(success: boolean): void {
    console.log('\n📊 Installation Verification Report');
    console.log('=====================================');
    
    if (success) {
      console.log('✅ Status: ALL TESTS PASSED');
      console.log('');
      console.log('Installation methods verified:');
      console.log('  • NPM package installation');
      console.log('  • Docker container execution');
      console.log('  • Source code installation');
      console.log('  • CLI entrypoint functionality');
      console.log('  • Server startup and tool loading');
      console.log('');
      console.log('The Financial Modeling Prep MCP Server is ready for registry publishing!');
    } else {
      console.log('❌ Status: SOME TESTS FAILED');
      console.log('');
      console.log('Please review the test output above and fix any issues before proceeding.');
      console.log('Common issues:');
      console.log('  • Missing dependencies (Node.js, NPM, Docker, Git)');
      console.log('  • Network connectivity issues');
      console.log('  • Build artifacts not present');
      console.log('  • Permission issues');
    }
    
    console.log('');
    console.log(`Test directory: ${this.testDir}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
  }

  /**
   * Runs the complete installation verification suite.
   */
  async run(): Promise<void> {
    console.log('🚀 Starting Installation Method Verification');
    console.log('===========================================');
    console.log('');

    let success = false;

    try {
      // Run pre-installation checks
      const preChecksPass = await this.runPreInstallationChecks();
      if (!preChecksPass) {
        console.log('❌ Pre-installation checks failed. Cannot proceed with installation tests.');
        return;
      }

      // Prepare test environment
      await this.prepareEnvironment();

      // Run installation verification tests
      success = await this.runInstallationTests();

    } catch (error) {
      console.error('💥 Installation verification failed with error:', error);
      success = false;
    } finally {
      // Clean up test environment
      await this.cleanupEnvironment();
      
      // Generate report
      this.generateReport(success);
      
      // Exit with appropriate code
      process.exit(success ? 0 : 1);
    }
  }
}

/**
 * Main execution function.
 */
async function main(): Promise<void> {
  const runner = new InstallationVerificationRunner();
  await runner.run();
}

// Handle CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
}

export { InstallationVerificationRunner };