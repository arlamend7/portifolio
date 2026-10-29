import { themedDiagram } from './themed-diagrams';
import MarkdownIt, { Token } from 'markdown-it';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import csharp from 'highlight.js/lib/languages/csharp';
import json from 'highlight.js/lib/languages/json';
import sql from 'highlight.js/lib/languages/sql';
import bash from 'highlight.js/lib/languages/bash';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';

for (const [name, language] of Object.entries({
  javascript,
  typescript,
  csharp,
  json,
  sql,
  bash,
  xml,
  css,
})) {
  hljs.registerLanguage(name, language);
}

export interface Heading {
  readonly id: string;
  readonly text: string;
  readonly level: number;
}
export interface MarkdownDocument {
  readonly html: string;
  readonly headings: readonly Heading[];
  readonly codeBlocks: readonly string[];
}

/** A document URL is the base for relative links and images, never the current route. */
export function resolveMarkdownUrl(value: string, baseUrl: string, image = false): string | null {
  if (value.startsWith('#'))
    return image ? null : `#readme-${value.slice(1).replace(/^readme-/, '')}`;
  try {
    const url = new URL(value, baseUrl);
    const allowed = ['https:', 'http:', ...(image ? [] : ['mailto:'])];
    return allowed.includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function headingSlug(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize('NFKD')
      .replace(/\p{M}/gu, '')
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .trim()
      .replace(/\s+/g, '-') || 'section'
  );
}

/** Raw HTML is disabled. All generated attributes and labels are escaped before rendering. */
export function renderMarkdown(
  source: string,
  baseUrl: string,
  copyLabel: string,
): MarkdownDocument {
  const parser = new MarkdownIt({ html: false, linkify: true, typographer: false });
  const headings: Heading[] = [];
  const codeBlocks: string[] = [];
  const usedIds = new Set<string>();
  const tokens = parser.parse(source, {});
  const escape = parser.utils.escapeHtml;

  for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index];
    if (token.type !== 'heading_open') continue;
    const text = tokens[index + 1]?.children?.map((child) => child.content).join('') || '';
    const baseId = `readme-${headingSlug(text)}`;
    let id = baseId;
    let suffix = 1;
    while (usedIds.has(id)) id = `${baseId}-${suffix++}`;
    usedIds.add(id);
    token.attrSet('id', id);
    headings.push({ id, text, level: Number(token.tag.slice(1)) });
  }

  function prepareLinks(children: Token[]): void {
    for (const token of children) {
      if (token.type === 'link_open' || token.type === 'image') {
        const image = token.type === 'image';
        const attribute = image ? 'src' : 'href';
        const resolved = resolveMarkdownUrl(String(token.attrGet(attribute) || ''), baseUrl, image);
        token.attrSet(attribute, resolved || '');
        if (image) token.attrSet('loading', 'lazy');
        if (
          !image &&
          resolved &&
          !resolved.startsWith('#') &&
          new URL(resolved).origin !== new URL(baseUrl).origin
        ) {
          token.attrSet('target', '_blank');
          token.attrSet('rel', 'noopener noreferrer');
        }
      }
      if (token.children) prepareLinks(token.children);
    }
  }
  prepareLinks(tokens);
  const defaultImage = parser.renderer.rules['image']!;
  let diagramId = 0;
  parser.renderer.rules['image'] = (items, index, options, env, renderer) => {
    const token = items[index];
    return (
      themedDiagram(String(token.attrGet('src') || ''), baseUrl, token.content, diagramId++) ??
      defaultImage(items, index, options, env, renderer)
    );
  };

  parser.renderer.rules['fence'] = (blocks, index) => {
    const block = blocks[index];
    const language = block.info.trim().split(/\s+/)[0] || 'text';
    const codeIndex = codeBlocks.push(block.content) - 1;
    const highlighted = hljs.getLanguage(language)
      ? hljs.highlight(block.content, { language, ignoreIllegals: true }).value
      : escape(block.content);
    return `<div class="code-block"><div class="code-toolbar"><span>${escape(language)}</span><button type="button" data-code-index="${codeIndex}">${escape(copyLabel)}</button></div><pre><code class="hljs">${highlighted}</code></pre></div>`;
  };
  parser.renderer.rules['table_open'] = () => '<div class="table-scroll"><table>';
  parser.renderer.rules['table_close'] = () => '</table></div>';

  return { html: parser.renderer.render(tokens, parser.options, {}), headings, codeBlocks };
}
