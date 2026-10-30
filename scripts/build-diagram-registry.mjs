import { globSync, readFileSync, writeFileSync } from 'node:fs';
// Only repository-owned vector diagrams enter the Markdown trust boundary.
const diagrams = {};
for (const path of globSync([
  'src/assets/capabilities/*/images/*.svg',
  'src/assets/projects/gft-life-insurance-sales-platform/images/*.svg',
  'src/assets/projects/techinnov-account-management-platform/images/*.svg',
  'src/assets/projects/techinnov-language-learning-platform/images/*.svg',
]).sort()) {
  const svg = readFileSync(path, 'utf8');
  if (/<(?:script|foreignObject|image|style)\b|\bon\w+\s*=|(?:href|src)\s*=/i.test(svg)) {
    throw new Error(`Unsupported active SVG content: ${path}`);
  }
  diagrams[path.slice(4)] = svg;
}
writeFileSync(
  'src/app/shared/markdown-reader/diagram-registry.json',
  JSON.stringify(diagrams, null, 2) + '\n',
);
