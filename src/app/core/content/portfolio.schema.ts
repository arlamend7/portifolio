import * as v from 'valibot';

export type { Locale } from '../i18n/locale';

const localizedTextSchema = v.object({
  en: v.string(),
  pt: v.optional(v.nullable(v.string())),
  fr: v.optional(v.nullable(v.string())),
});
export type LocalizedText = v.InferOutput<typeof localizedTextSchema>;

const idSchema = v.pipe(v.string(), v.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/));
const externalUrlSchema = v.pipe(
  v.string(),
  v.url(),
  v.check((url) => url.startsWith('https://'), 'External links must use HTTPS.'),
);
const markdownPathSchema = v.pipe(
  v.string(),
  v.regex(
    /^assets\/[a-zA-Z0-9/_-]+\.md$/,
    'Project documents must be Markdown files inside assets/.',
  ),
);

const packageSchema = v.pipe(
  v.object({
    kind: v.literal('package'),
    id: v.optional(idSchema),
    name: v.optional(v.string()),
    description: v.optional(localizedTextSchema),
    url: v.nullable(externalUrlSchema),
  }),
  v.transform((entry) => {
    const url = entry.url ? new URL(entry.url) : null;
    const name =
      entry.name || url?.pathname.split('/').filter(Boolean).pop() || url?.hostname || 'Package';
    const id =
      entry.id ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    return { ...entry, id, name };
  }),
);
const projectSchema = v.object({
  kind: v.literal('project'),
  id: idSchema,
  name: v.string(),
  description: localizedTextSchema,
  markdown: v.object({
    en: markdownPathSchema,
    pt: v.optional(v.nullable(markdownPathSchema)),
    fr: v.optional(v.nullable(markdownPathSchema)),
  }),
});
export const projectEntrySchema = v.union([packageSchema, projectSchema]);
export type ProjectEntry = v.InferOutput<typeof projectEntrySchema>;
export type DocumentProject = Extract<ProjectEntry, { kind: 'project' }>;

const featureSchema = v.object({
  id: v.string(),
  icon: v.string(),
  eyebrow: localizedTextSchema,
  title: localizedTextSchema,
  description: localizedTextSchema,
  footerLabel: localizedTextSchema,
  footer: localizedTextSchema,
  tone: v.picklist(['primary', 'accent']),
});
export type Feature = v.InferOutput<typeof featureSchema>;

const companySchema = v.object({
  id: idSchema,
  name: v.string(),
  role: localizedTextSchema,
  period: v.object({
    startYear: v.pipe(v.number(), v.integer()),
    endYear: v.nullable(v.pipe(v.number(), v.integer())),
    current: v.boolean(),
  }),
  location: v.nullable(v.string()),
  engagement: localizedTextSchema,
  summary: localizedTextSchema,
  description: v.array(localizedTextSchema),
  work: v.array(v.object({ title: localizedTextSchema, items: v.array(localizedTextSchema) })),
  achievements: v.array(localizedTextSchema),
  technologies: v.array(v.string()),
  projectIds: v.array(idSchema),
});
export type Company = v.InferOutput<typeof companySchema>;

export const portfolioSchema = v.pipe(
  v.object({
    schemaVersion: v.literal(2),
    profile: v.object({
      name: v.string(),
      tagline: localizedTextSchema,
      location: v.string(),
      summary: localizedTextSchema,
      socialLinks: v.array(
        v.object({ label: v.string(), icon: v.string(), url: externalUrlSchema }),
      ),
    }),
    home: v.object({
      badges: v.array(localizedTextSchema),
      eyebrow: localizedTextSchema,
      title: localizedTextSchema,
      subtitle: localizedTextSchema,
      introduction: localizedTextSchema,
      stack: localizedTextSchema,
      stackDescription: localizedTextSchema,
      sportsSummary: localizedTextSchema,
      capabilities: v.array(featureSchema),
      recognitions: v.array(featureSchema),
      sports: v.array(
        v.object({
          id: idSchema,
          icon: v.string(),
          year: v.number(),
          title: localizedTextSchema,
          result: localizedTextSchema,
          description: localizedTextSchema,
        }),
      ),
      sportsIntroduction: localizedTextSchema,
      sportsImage: v.object({
        src: v.string(),
        alt: localizedTextSchema,
        caption: localizedTextSchema,
      }),
      gaming: localizedTextSchema,
    }),
    companies: v.array(companySchema),
    projects: v.array(projectEntrySchema),
    initialCompanyId: idSchema,
  }),
  v.check(
    (content) =>
      [content.companies, content.projects].every(
        (collection) => new Set(collection.map((item) => item.id)).size === collection.length,
      ),
    'Content IDs must be unique.',
  ),
  v.check(
    (content) => content.companies.some((company) => company.id === content.initialCompanyId),
    'initialCompanyId must reference an existing company.',
  ),
  v.check(
    (content) =>
      content.companies.every((company) =>
        company.projectIds.every((id) =>
          content.projects.some((project) => project.id === id && project.kind === 'project'),
        ),
      ),
    'Company projectIds must reference document projects.',
  ),
);
export type Portfolio = v.InferOutput<typeof portfolioSchema>;

export function parsePortfolio(input: unknown): Portfolio {
  return v.parse(portfolioSchema, input);
}
