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
const localizedMarkdownSchema = v.object({
  en: markdownPathSchema,
  pt: v.optional(v.nullable(markdownPathSchema)),
  fr: v.optional(v.nullable(markdownPathSchema)),
});
export type LocalizedMarkdown = v.InferOutput<typeof localizedMarkdownSchema>;
const contactUrlSchema = v.union([
  externalUrlSchema,
  v.pipe(v.string(), v.regex(/^mailto:[^\s?@]+@[^\s?@]+\.[^\s?@]+$/)),
]);

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
  markdown: localizedMarkdownSchema,
});
export const projectEntrySchema = v.union([packageSchema, projectSchema]);
export type ProjectEntry = v.InferOutput<typeof projectEntrySchema>;
export type DocumentProject = Extract<ProjectEntry, { kind: 'project' }>;

const featureSchema = v.object({
  id: idSchema,
  eyebrow: localizedTextSchema,
  title: localizedTextSchema,
  description: localizedTextSchema,
  selection: v.optional(v.object({ label: localizedTextSchema, value: localizedTextSchema })),
});
export type Feature = v.InferOutput<typeof featureSchema>;
const capabilitySchema = v.object({ ...featureSchema.entries, markdown: localizedMarkdownSchema });

const technologySchema = v.object({ id: idSchema, name: v.string(), icon: v.string() });
export type Technology = v.InferOutput<typeof technologySchema>;
export const certificateCategories = [
  'backend',
  'frontend',
  'accessibility',
  'design',
  'data',
  'devops',
  'business',
] as const;
const certificateSchema = v.object({
  id: idSchema,
  title: localizedTextSchema,
  provider: v.string(),
  kind: v.picklist(['course', 'path']),
  category: v.picklist(certificateCategories),
  issued: v.pipe(v.string(), v.regex(/^\d{4}-(0[1-9]|1[0-2])$/)),
  hours: v.optional(v.pipe(v.number(), v.minValue(1))),
  url: v.nullable(externalUrlSchema),
});
export type Certificate = v.InferOutput<typeof certificateSchema>;

const sportsAchievementSchema = v.object({
  id: idSchema,
  icon: v.string(),
  year: v.pipe(v.number(), v.integer()),
  title: localizedTextSchema,
  result: v.optional(localizedTextSchema),
  description: v.optional(localizedTextSchema),
  placements: v.optional(
    v.array(v.object({ id: idSchema, event: localizedTextSchema, result: localizedTextSchema })),
  ),
});
export type SportsAchievement = v.InferOutput<typeof sportsAchievementSchema>;

const sportsPhotoSchema = v.object({
  src: v.string(),
  alt: localizedTextSchema,
  caption: localizedTextSchema,
  sourceUrl: externalUrlSchema,
});
export type SportsPhotoContent = v.InferOutput<typeof sportsPhotoSchema>;

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
        v.object({
          label: v.string(),
          icon: v.string(),
          brand: v.optional(
            v.picklist(['linkedin', 'github', 'gmail', 'instagram', 'steam', 'buymeacoffee']),
          ),
          url: contactUrlSchema,
          description: localizedTextSchema,
        }),
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
      capabilities: v.array(capabilitySchema),
      recognitions: v.array(featureSchema),
      certificateIds: v.array(idSchema),
      languageTests: v.array(
        v.object({
          id: idSchema,
          language: localizedTextSchema,
          test: v.string(),
          date: v.string(),
          summary: localizedTextSchema,
          scores: v.array(v.object({ label: localizedTextSchema, value: v.string() })),
          pdf: v.pipe(v.string(), v.regex(/^assets\/documents\/[a-z0-9-]+\.pdf$/)),
        }),
      ),
    }),
    sports: v.object({
      introduction: localizedTextSchema,
      journey: localizedTextSchema,
      image: sportsPhotoSchema,
      highlightIds: v.array(idSchema),
      achievements: v.array(sportsAchievementSchema),
    }),
    companies: v.array(companySchema),
    projects: v.array(projectEntrySchema),
    technologies: v.array(technologySchema),
    certificates: v.array(certificateSchema),
    initialCompanyId: idSchema,
  }),
  v.check(
    (content) =>
      [
        content.companies,
        content.projects,
        content.sports.achievements,
        content.technologies,
        content.certificates,
        content.home.capabilities,
        content.home.recognitions,
      ].every(
        (collection) => new Set(collection.map((item) => item.id)).size === collection.length,
      ),
    'Content IDs must be unique.',
  ),
  v.check(
    (content) =>
      new Set(content.home.certificateIds).size === content.home.certificateIds.length &&
      content.home.certificateIds.every((id) =>
        content.certificates.some((item) => item.id === id),
      ),
    'Featured certificates must reference unique, existing certificates.',
  ),
  v.check(
    (content) =>
      new Set(content.sports.highlightIds).size === content.sports.highlightIds.length &&
      content.sports.highlightIds.every((id) =>
        content.sports.achievements.some((achievement) => achievement.id === id),
      ),
    'Sports highlights must reference unique, existing achievements.',
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
