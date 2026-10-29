import diagrams from './diagram-registry.json';

/** Exact allowlist of build-time, repository-owned SVGs; never inline remote SVG. */
export function themedDiagram(
  url: string,
  baseUrl: string,
  label: string,
  id: number,
): string | null {
  const base = new URL(baseUrl);
  const assetStart = base.pathname.indexOf('/assets/');
  if (assetStart < 0) return null;
  const root = new URL(base.pathname.slice(0, assetStart + 1), base.origin);
  const registry = diagrams as Record<string, string>;
  const key = Object.keys(registry).find((path) => new URL(path, root).href === url);
  if (!key) return null;
  const prefix = `diagram-${id}-`;
  const svg = registry[key]
    .replace(/id="([^"]+)"/g, (_, value: string) => `id="${prefix}${value}"`)
    .replace(/url\(#([^)]+)\)/g, (_, value: string) => `url(#${prefix}${value})`)
    .replace(
      /aria-labelledby="([^"]+)"/g,
      (_, value: string) =>
        `aria-labelledby="${value
          .split(' ')
          .map((item) => prefix + item)
          .join(' ')}"`,
    );
  const escaped = label.replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!,
  );
  return `<span class="themed-diagram" role="img" aria-label="${escaped}">${svg.replace('<svg ', '<svg aria-hidden="true" ')}</span>`;
}
