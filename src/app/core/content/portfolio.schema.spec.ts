import { parse, safeParse } from 'valibot';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import content from '../../../assets/content/portfolio.json';
import en from '../../../assets/i18n/en.json';
import pt from '../../../assets/i18n/pt.json';
import fr from '../../../assets/i18n/fr.json';
import { portfolioSchema, projectEntrySchema } from './portfolio.schema';

function keys(value: object, prefix = ''): string[] {
  return Object.entries(value)
    .flatMap(([key, nested]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      return typeof nested === 'object' && nested !== null ? keys(nested, path) : [path];
    })
    .sort();
}

describe('Portfolio content contract', () => {
  it('validates supplied content and all configured Markdown files', () => {
    const result = parse(portfolioSchema, content);
    for (const project of result.projects) {
      if (project.kind !== 'project') continue;
      for (const path of Object.values(project.markdown)) {
        if (path) expect(existsSync(resolve('src', path)), path).toBe(true);
      }
    }
  });

  it('accepts a package with just its kind and URL', () => {
    expect(
      parse(projectEntrySchema, {
        kind: 'package',
        url: 'https://pub.dev/packages/example_package',
      }),
    ).toMatchObject({ kind: 'package', name: 'example_package', id: 'example-package' });
  });

  it('rejects unsafe URLs, duplicate IDs and unresolved employer projects', () => {
    expect(
      safeParse(projectEntrySchema, { kind: 'package', url: 'javascript:alert(1)' }).success,
    ).toBe(false);
    expect(
      safeParse(portfolioSchema, {
        ...content,
        projects: [...content.projects, content.projects[0]],
      }).success,
    ).toBe(false);
    const invalid = {
      ...content,
      companies: content.companies.map((company, index) => ({
        ...company,
        projectIds: index === 0 ? ['unknown'] : company.projectIds,
      })),
    };
    expect(safeParse(portfolioSchema, invalid).success).toBe(false);
  });

  it('rejects documents outside assets and permits translated document paths', () => {
    const project = {
      kind: 'project',
      id: 'example',
      name: 'Example',
      description: { en: '' },
      markdown: { en: 'assets/example.md', fr: 'assets/fr/example.md' },
    };
    expect(safeParse(projectEntrySchema, project).success).toBe(true);
    expect(
      safeParse(projectEntrySchema, { ...project, markdown: { en: '../private.md' } }).success,
    ).toBe(false);
  });

  it('keeps EN, PT and FR UI dictionaries complete and aligned', () => {
    expect(keys(pt)).toEqual(keys(en));
    expect(keys(fr)).toEqual(keys(en));
  });
});
