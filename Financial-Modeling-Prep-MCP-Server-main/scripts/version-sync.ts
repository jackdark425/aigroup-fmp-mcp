#!/usr/bin/env tsx

import { program } from 'commander';

/**
 * Safely extracts error message from unknown error type.
 * @param error - The error to extract message from.
 * @returns The error message string.
 */
function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
import {
  validateVersionConsistency,
  validateServerJsonSchema,
  synchronizeVersion,
  getVersionInfo,
  getCurrentVersion,
  type SyncOptions
} from '../src/utils/versionSync.js';

/**
 * Formats validation results for console output.
 * @param result - The validation result to format.
 * @param title - Title for the validation section.
 */
function formatValidationResult(result: any, title: string): void {
  console.log(`\n${title}:`);
  console.log('='.repeat(title.length + 1));
  
  if (result.isValid) {
    console.log('✅ All validations passed');
  } else {
    console.log('❌ Validation failed');
  }
  
  if (result.errors.length > 0) {
    console.log('\nErrors:');
    result.errors.forEach((error: string) => console.log(`  ❌ ${error}`));
  }
  
  if (result.warnings.length > 0) {
    console.log('\nWarnings:');
    result.warnings.forEach((warning: string) => console.log(`  ⚠️  ${warning}`));
  }
}

/**
 * Command to validate version consistency across all files.
 */
async function validateCommand(): Promise<void> {
  try {
    console.log('🔍 Validating version consistency...');
    
    const versionInfo = await getVersionInfo();
    console.log('\nCurrent versions:');
    console.log(`  package.json: ${versionInfo.packageJson}`);
    console.log(`  server.json:  ${versionInfo.serverJson}`);
    console.log(`  CHANGELOG.md: ${versionInfo.changelog || 'not found'}`);
    
    const consistencyResult = await validateVersionConsistency();
    formatValidationResult(consistencyResult, 'Version Consistency Check');
    
    const schemaResult = await validateServerJsonSchema();
    formatValidationResult(schemaResult, 'Server.json Schema Validation');
    
    const overallValid = consistencyResult.isValid && schemaResult.isValid;
    process.exit(overallValid ? 0 : 1);
    
  } catch (error) {
    console.error('❌ Validation failed:', getErrorMessage(error));
    process.exit(1);
  }
}

/**
 * Command to synchronize version across all files.
 */
async function syncCommand(newVersion: string, options: any): Promise<void> {
  try {
    const syncOptions: SyncOptions = {
      dryRun: options.dryRun,
      validateSchema: !options.skipSchema,
      updateChangelog: !options.skipChangelog
    };
    
    if (options.dryRun) {
      console.log('🔍 Running in dry-run mode (no files will be modified)');
    }
    
    console.log(`🔄 Synchronizing version to ${newVersion}...`);
    
    const result = await synchronizeVersion(newVersion, process.cwd(), syncOptions);
    
    if (result.isValid) {
      console.log('✅ Version synchronization completed successfully');
      
      if (!options.dryRun) {
        const versionInfo = await getVersionInfo();
        console.log('\nUpdated versions:');
        console.log(`  package.json: ${versionInfo.packageJson}`);
        console.log(`  server.json:  ${versionInfo.serverJson}`);
        console.log(`  CHANGELOG.md: ${versionInfo.changelog || 'not found'}`);
      }
    } else {
      console.log('❌ Version synchronization failed');
    }
    
    formatValidationResult(result, 'Synchronization Results');
    
    process.exit(result.isValid ? 0 : 1);
    
  } catch (error) {
    console.error('❌ Synchronization failed:', getErrorMessage(error));
    process.exit(1);
  }
}

/**
 * Command to show current version information.
 */
async function infoCommand(): Promise<void> {
  try {
    console.log('📋 Current version information:');
    
    const versionInfo = await getVersionInfo();
    console.log(`\n  package.json: ${versionInfo.packageJson}`);
    console.log(`  server.json:  ${versionInfo.serverJson}`);
    console.log(`  CHANGELOG.md: ${versionInfo.changelog || 'not found'}`);
    
    const currentVersion = await getCurrentVersion();
    console.log(`\n  Current version: ${currentVersion}`);
    
    // Quick consistency check
    const allSame = versionInfo.packageJson === versionInfo.serverJson && 
                   (!versionInfo.changelog || versionInfo.changelog === versionInfo.packageJson);
    
    console.log(`  Status: ${allSame ? '✅ Consistent' : '⚠️  Inconsistent'}`);
    
  } catch (error) {
    console.error('❌ Failed to get version info:', getErrorMessage(error));
    process.exit(1);
  }
}

// Configure CLI program
program
  .name('version-sync')
  .description('Version synchronization utilities for MCP registry publishing')
  .version('1.0.0');

program
  .command('validate')
  .description('Validate version consistency and server.json schema')
  .action(validateCommand);

program
  .command('sync <version>')
  .description('Synchronize version across all files')
  .option('-d, --dry-run', 'Show what would be changed without making changes')
  .option('--skip-schema', 'Skip server.json schema validation')
  .option('--skip-changelog', 'Skip CHANGELOG.md updates')
  .action(syncCommand);

program
  .command('info')
  .description('Show current version information')
  .action(infoCommand);

// Parse command line arguments
program.parse();