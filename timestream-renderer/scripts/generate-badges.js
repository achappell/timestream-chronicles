import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const coverageFile = path.join(rootDir, 'coverage', 'coverage-summary.json');
const pkgFile = path.join(rootDir, 'package.json');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 1. Generate Coverage Badge
let coverageMessage = 'Unknown';
if (fs.existsSync(coverageFile)) {
  const coverageData = JSON.parse(fs.readFileSync(coverageFile, 'utf8'));
  // We use lines coverage as the primary metric
  const linesPct = coverageData.total.lines.pct;
  coverageMessage = `${linesPct}%`;
} else {
  console.warn('Coverage summary not found. Did you run the tests with coverage?');
}

const coverageBadge = {
  schemaVersion: 1,
  label: 'Coverage',
  message: coverageMessage,
  color: 'white',
  namedLogo: 'vitest',
  logoColor: 'black',
  style: 'flat-square'
};

fs.writeFileSync(
  path.join(distDir, 'coverage.json'),
  JSON.stringify(coverageBadge, null, 2)
);

// 2. Generate Version Badge
const pkgData = JSON.parse(fs.readFileSync(pkgFile, 'utf8'));
const version = pkgData.version;

let gitHash = 'unknown';
try {
  gitHash = process.env.VITE_GIT_HASH || execSync('git rev-parse --short HEAD').toString().trim();
} catch (e) {
  console.warn('Could not determine git hash.');
}

const versionBadge = {
  schemaVersion: 1,
  label: 'Version',
  message: `${version}-${gitHash}`,
  color: 'black',
  style: 'flat-square'
};

fs.writeFileSync(
  path.join(distDir, 'version.json'),
  JSON.stringify(versionBadge, null, 2)
);

console.log('Successfully generated badge endpoints in dist/ directory.');
