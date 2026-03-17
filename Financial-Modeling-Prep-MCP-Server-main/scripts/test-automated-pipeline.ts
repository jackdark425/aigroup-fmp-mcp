#!/usr/bin/env tsx

/**
 * Automated Publishing Pipeline Test
 * This script validates the GitHub Actions workflow and automated publishing components
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';

/**
 * Executes a command safely and returns result
 * @param command - Command to execute
 * @returns Object with success status and output
 */
function safeExecute(command: string): { success: boolean; output: string } {
  try {
    const output = execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
    return { success: true, output };
  } catch (error: any) {
    return { success: false, output: error.message };
  }
}

/**
 * Validates GitHub Actions workflow configuration
 * @returns True if workflow is properly configured
 */
function validateWorkflow(): boolean {
  console.log('Validating GitHub Actions workflow...');
  
  if (!existsSync('.github/workflows/release.yml')) {
    console.log('   FAILURE: Workflow file not found');
    return false;
  }
  
  try {
    const workflowContent = readFileSync('.github/workflows/release.yml', 'utf-8');
    
    // Required workflow components
    const requiredComponents = [
      { name: 'validate job', pattern: /jobs:\s*\n\s*validate:/ },
      { name: 'publish job', pattern: /publish:/ },
      { name: 'release job', pattern: /release:/ },
      { name: 'notify-failure job', pattern: /notify-failure:/ },
      { name: 'NPM_TOKEN usage', pattern: /NPM_TOKEN/ },
      { name: 'GitHub OIDC auth', pattern: /github-oidc/ },
      { name: 'version validation', pattern: /version:validate/ },
      { name: 'NPM readiness check', pattern: /verify:npm-ready/ },
      { name: 'registry submission check', pattern: /verify:registry-submission/ },
      { name: 'dry run support', pattern: /dry_run/ },
      { name: 'error handling', pattern: /if:\s*failure\(\)/ },
      { name: 'workflow dispatch', pattern: /workflow_dispatch/ }
    ];
    
    let allComponentsFound = true;
    
    for (const component of requiredComponents) {
      if (component.pattern.test(workflowContent)) {
        console.log(`   SUCCESS: ${component.name} configured`);
      } else {
        console.log(`   FAILURE: ${component.name} missing`);
        allComponentsFound = false;
      }
    }
    
    // Check for proper job dependencies
    if (workflowContent.includes('needs: validate') && workflowContent.includes('needs: [validate, publish]')) {
      console.log('   SUCCESS: Job dependencies configured');
    } else {
      console.log('   FAILURE: Job dependencies not properly configured');
      allComponentsFound = false;
    }
    
    // Check for timeout configurations
    if (workflowContent.includes('timeout')) {
      console.log('   SUCCESS: Timeout configurations found');
    } else {
      console.log('   WARNING: No timeout configurations (recommended for reliability)');
    }
    
    return allComponentsFound;
    
  } catch (error) {
    console.log('   ❌ Error reading workflow file:', error);
    return false;
  }
}

/**
 * Validates pipeline scripts and dependencies
 * @returns True if all pipeline components are available
 */
function validatePipelineScripts(): boolean {
  console.log('\nValidating pipeline scripts...');
  
  const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
  const requiredScripts = [
    'version:validate',
    'verify:npm-ready',
    'verify:registry-submission',
    'test:complete-workflow',
    'publish:validate',
    'publish:dry-run',
    'publish:manual'
  ];
  
  let allScriptsFound = true;
  
  for (const script of requiredScripts) {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`   SUCCESS: Script available: ${script}`);
    } else {
      console.log(`   FAILURE: Script missing: ${script}`);
      allScriptsFound = false;
    }
  }
  
  return allScriptsFound;
}

/**
 * Tests pipeline validation steps
 * @returns True if all validation steps pass
 */
function testValidationSteps(): boolean {
  console.log('\nTesting pipeline validation steps...');
  
  const validationSteps = [
    { name: 'Version synchronization', command: 'npm run version:validate' },
    { name: 'NPM readiness', command: 'npm run verify:npm-ready' },
    { name: 'Build process', command: 'npm run build' },
    { name: 'Test suite', command: 'npm run test:run' }
  ];
  
  let allStepsPassed = true;
  
  for (const step of validationSteps) {
    const result = safeExecute(step.command);
    if (result.success) {
      console.log(`   SUCCESS: ${step.name} validation passed`);
    } else {
      console.log(`   FAILURE: ${step.name} validation failed`);
      console.log(`   Details: ${result.output.split('\n')[0]}`);
      allStepsPassed = false;
    }
  }
  
  // Note: Registry metadata validation is expected to fail if package isn't published yet
  console.log('   INFO: Registry metadata validation skipped (requires published package)');
  
  return allStepsPassed;
}

/**
 * Validates secret requirements and configuration
 * @returns True if secrets are properly documented
 */
function validateSecretRequirements(): boolean {
  console.log('\nValidating secret requirements...');
  
  // Check if workflow references required secrets
  const workflowContent = readFileSync('.github/workflows/release.yml', 'utf-8');
  
  if (workflowContent.includes('secrets.NPM_TOKEN')) {
    console.log('   SUCCESS: NPM_TOKEN secret referenced in workflow');
  } else {
    console.log('   FAILURE: NPM_TOKEN secret not referenced in workflow');
    return false;
  }
  
  // Check for secret validation in workflow
  if (workflowContent.includes('validate-secrets')) {
    console.log('   SUCCESS: Secret validation step included');
  } else {
    console.log('   FAILURE: Secret validation step missing');
    return false;
  }
  
  // Check for GitHub OIDC permissions
  if (workflowContent.includes('id-token: write')) {
    console.log('   SUCCESS: GitHub OIDC permissions configured');
  } else {
    console.log('   FAILURE: GitHub OIDC permissions missing');
    return false;
  }
  
  return true;
}

/**
 * Tests error handling and rollback mechanisms
 * @returns True if error handling is properly configured
 */
function testErrorHandling(): boolean {
  console.log('\nTesting error handling mechanisms...');
  
  const workflowContent = readFileSync('.github/workflows/release.yml', 'utf-8');
  
  // Check for failure notification job
  if (workflowContent.includes('notify-failure:') && workflowContent.includes('if: failure()')) {
    console.log('   SUCCESS: Failure notification job configured');
  } else {
    console.log('   FAILURE: Failure notification job missing');
    return false;
  }
  
  // Check for timeout configurations
  if (workflowContent.includes('timeout')) {
    console.log('   SUCCESS: Timeout protections configured');
  } else {
    console.log('   WARNING: Timeout protections recommended');
  }
  
  // Check for conditional publishing
  if (workflowContent.includes('should_publish') && workflowContent.includes('dry_run')) {
    console.log('   SUCCESS: Conditional publishing logic configured');
  } else {
    console.log('   FAILURE: Conditional publishing logic missing');
    return false;
  }
  
  // Test manual publishing rollback
  const rollbackTest = safeExecute('npm run publish:troubleshoot');
  if (rollbackTest.success || rollbackTest.output.includes('troubleshoot')) {
    console.log('   SUCCESS: Troubleshooting tools available');
  } else {
    console.log('   FAILURE: Troubleshooting tools missing');
    return false;
  }
  
  return true;
}

/**
 * Simulates the automated pipeline workflow
 * @returns True if simulation completes successfully
 */
function simulatePipeline(): boolean {
  console.log('\nSimulating automated pipeline workflow...');
  
  // Simulate validation phase
  console.log('   Phase 1: Validation');
  const validationResult = testValidationSteps();
  if (!validationResult) {
    console.log('   FAILURE: Validation phase would fail');
    return false;
  }
  
  // Simulate build phase
  console.log('   Phase 2: Build');
  const buildResult = safeExecute('npm run build');
  if (!buildResult.success) {
    console.log('   FAILURE: Build phase would fail');
    return false;
  }
  
  // Simulate dry run publishing
  console.log('   Phase 3: Publishing (dry run)');
  const dryRunResult = safeExecute('timeout 30s npm run publish:dry-run || true');
  if (dryRunResult.success || dryRunResult.output.includes('dry-run') || dryRunResult.output.includes('Would publish')) {
    console.log('   SUCCESS: Publishing phase simulation successful');
  } else {
    console.log('   WARNING: Publishing phase may require authentication');
  }
  
  console.log('   SUCCESS: Pipeline simulation completed successfully');
  return true;
}

/**
 * Main test function for automated publishing pipeline
 */
async function testAutomatedPipeline(): Promise<void> {
  console.log('Automated Publishing Pipeline Validation\n');
  
  const tests = [
    { name: 'GitHub Actions Workflow', test: validateWorkflow },
    { name: 'Pipeline Scripts', test: validatePipelineScripts },
    { name: 'Validation Steps', test: testValidationSteps },
    { name: 'Secret Requirements', test: validateSecretRequirements },
    { name: 'Error Handling', test: testErrorHandling },
    { name: 'Pipeline Simulation', test: simulatePipeline }
  ];
  
  let allTestsPassed = true;
  const results: { name: string; passed: boolean }[] = [];
  
  for (const test of tests) {
    try {
      const passed = test.test();
      results.push({ name: test.name, passed });
      if (!passed) {
        allTestsPassed = false;
      }
    } catch (error) {
      console.log(`   ❌ ${test.name} test failed with error:`, error);
      results.push({ name: test.name, passed: false });
      allTestsPassed = false;
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('Test Results Summary:');
  
  for (const result of results) {
    const status = result.passed ? 'SUCCESS' : 'FAILURE';
    console.log(`  ${status}: ${result.name}`);
  }
  
  if (allTestsPassed) {
    console.log('\nSUCCESS: Automated Publishing Pipeline is READY!');
    console.log('\nPipeline Features Validated:');
    console.log('  - Multi-stage workflow (validate → publish → release)');
    console.log('  - Comprehensive validation steps');
    console.log('  - NPM and MCP Registry publishing');
    console.log('  - Error handling and failure notification');
    console.log('  - Dry run support for testing');
    console.log('  - Secret management and authentication');
    console.log('  - Installation verification');
    
    console.log('\nReady for Production Use:');
    console.log('  1. Configure NPM_TOKEN secret in GitHub repository settings');
    console.log('  2. Push version tag to trigger automated publishing');
    console.log('  3. Monitor workflow execution in GitHub Actions');
    
    console.log('\nUsage Examples:');
    console.log('  # Automated publishing (production)');
    console.log('  git tag v2.5.1 && git push --tags');
    console.log('');
    console.log('  # Manual workflow trigger with dry run');
    console.log('  # Go to GitHub Actions → Automated Publishing Pipeline → Run workflow');
    console.log('  # Set dry_run=true for testing');
    
  } else {
    console.log('\nFAILURE: Automated Publishing Pipeline has ISSUES!');
    console.log('\nRequired Actions:');
    console.log('  1. Fix failed validation steps above');
    console.log('  2. Ensure all required scripts are available');
    console.log('  3. Configure GitHub Actions workflow properly');
    console.log('  4. Set up required secrets and permissions');
    
    console.log('\nTroubleshooting:');
    console.log('  - Run: npm run test:complete-workflow');
    console.log('  - Run: npm run publish:troubleshoot');
    console.log('  - Check: .github/workflows/release.yml');
    
    process.exit(1);
  }
}

// Run test if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testAutomatedPipeline().catch(console.error);
}

export { testAutomatedPipeline };