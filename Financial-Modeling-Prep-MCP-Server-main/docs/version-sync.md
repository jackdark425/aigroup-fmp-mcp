# Version Synchronization Utilities

This document describes the version synchronization utilities for the Financial Modeling Prep MCP Server, designed to maintain consistency across all version references in the project.

## Overview

The version synchronization utilities ensure that version numbers remain consistent across:

- `package.json` - NPM package version
- `server.json` - MCP registry server version and package versions
- `CHANGELOG.md` - Release history (optional)

## Features

- **SemVer Validation**: Ensures all versions follow semantic versioning standards
- **Consistency Checking**: Validates that all files have matching versions
- **Schema Validation**: Validates `server.json` against the official MCP schema
- **Automatic Synchronization**: Updates all version references simultaneously
- **Dry Run Mode**: Preview changes without modifying files
- **CLI Interface**: Easy-to-use command-line tools

## Usage

### NPM Scripts

The following NPM scripts are available for version management:

```bash
# Show current version information
npm run version:info

# Validate version consistency and schema compliance
npm run version:validate

# Synchronize version across all files
npm run version:sync <version> [options]
```

### CLI Commands

#### Show Version Information

```bash
npm run version:info
```

Displays current version information from all files and consistency status.

#### Validate Versions

```bash
npm run version:validate
```

Performs comprehensive validation:
- Version consistency across all files
- SemVer format compliance
- `server.json` schema validation
- Package version alignment

#### Synchronize Versions

```bash
# Update to new version
npm run version:sync 2.5.0

# Dry run (preview changes)
npm run version:sync 2.5.0 --dry-run

# Skip schema validation
npm run version:sync 2.5.0 --skip-schema

# Skip changelog updates
npm run version:sync 2.5.0 --skip-changelog
```

## API Reference

### Core Functions

#### `isValidSemVer(version: string): boolean`

Validates if a version string follows semantic versioning format.

```typescript
import { isValidSemVer } from './src/utils/versionSync.js';

console.log(isValidSemVer('1.0.0')); // true
console.log(isValidSemVer('v1.0.0')); // false
```

#### `getVersionInfo(rootPath?: string): Promise<VersionInfo>`

Retrieves version information from all project files.

```typescript
import { getVersionInfo } from './src/utils/versionSync.js';

const versions = await getVersionInfo();
console.log(versions.packageJson); // "2.4.0"
console.log(versions.serverJson);  // "2.4.0"
console.log(versions.changelog);   // "2.4.0" or undefined
```

#### `validateVersionConsistency(rootPath?: string): Promise<ValidationResult>`

Validates version consistency across all files.

```typescript
import { validateVersionConsistency } from './src/utils/versionSync.js';

const result = await validateVersionConsistency();
if (result.isValid) {
  console.log('All versions are consistent');
} else {
  console.log('Errors:', result.errors);
}
```

#### `validateServerJsonSchema(rootPath?: string): Promise<ValidationResult>`

Validates `server.json` against the official MCP schema.

```typescript
import { validateServerJsonSchema } from './src/utils/versionSync.js';

const result = await validateServerJsonSchema();
if (result.isValid) {
  console.log('Schema validation passed');
} else {
  console.log('Schema errors:', result.errors);
}
```

#### `synchronizeVersion(newVersion: string, rootPath?: string, options?: SyncOptions): Promise<ValidationResult>`

Synchronizes version across all files.

```typescript
import { synchronizeVersion } from './src/utils/versionSync.js';

const result = await synchronizeVersion('2.5.0', process.cwd(), {
  dryRun: false,
  validateSchema: true,
  updateChangelog: true
});

if (result.isValid) {
  console.log('Version synchronized successfully');
} else {
  console.log('Synchronization failed:', result.errors);
}
```

### Types

#### `VersionInfo`

```typescript
interface VersionInfo {
  packageJson: string;
  serverJson: string;
  changelog?: string;
}
```

#### `ValidationResult`

```typescript
interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
```

#### `SyncOptions`

```typescript
interface SyncOptions {
  dryRun?: boolean;
  validateSchema?: boolean;
  updateChangelog?: boolean;
}
```

## Integration with CI/CD

The version synchronization utilities can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Validate versions
  run: npm run version:validate

- name: Synchronize version
  run: npm run version:sync ${{ github.event.inputs.version }}
```

## Error Handling

The utilities provide comprehensive error handling:

- **Validation Errors**: Clear messages for version mismatches and schema violations
- **File Errors**: Graceful handling of missing or corrupted files
- **Format Errors**: Detailed SemVer validation feedback
- **Rollback Support**: Safe operation with dry-run mode

## Best Practices

1. **Always validate** before synchronizing versions
2. **Use dry-run mode** to preview changes
3. **Maintain CHANGELOG.md** for release tracking
4. **Validate schema** before registry submission
5. **Integrate with CI/CD** for automated consistency checks

## Troubleshooting

### Common Issues

#### Version Mismatch
```
Error: Version mismatch: package.json (2.4.0) != server.json (2.5.0)
```
**Solution**: Run `npm run version:sync <correct-version>` to synchronize.

#### Invalid SemVer
```
Error: package.json version "v2.4.0" is not valid SemVer
```
**Solution**: Remove the "v" prefix and use proper SemVer format.

#### Schema Validation Failure
```
Error: server.json missing required field: description
```
**Solution**: Add the missing required fields to `server.json`.

#### Missing Files
```
Warning: CHANGELOG.md not found or no version detected
```
**Solution**: Create a CHANGELOG.md file or use `--skip-changelog` option.