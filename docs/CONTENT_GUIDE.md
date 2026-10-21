# Content editing guide

## One catalog, two entry types

Edit `src/assets/content/portfolio.json`. Its `projects` array holds packages and documented projects. Each ID must be unique. The application validates the file before showing it.

### A package: only a library link is required

```json
{
  "kind": "package",
  "url": "https://pub.dev/packages/your_package"
}
```

The name and ID are derived from the URL. You can supply `id`, `name`, and localized `description` to override them. For example:

```json
{
  "kind": "package",
  "id": "your-package",
  "name": "Your package",
  "url": "https://github.com/your-account/your-package",
  "description": {
    "en": "Your English description",
    "pt": "Sua descrição em português",
    "fr": "Votre description en français"
  }
}
```

These URLs are examples. Replace them with your actual library links. A `null` URL is only for an existing named package whose link has not been supplied yet; it is displayed without a fake clickable destination.

### A project: one folder, three languages

Each project has a folder under `src/assets/projects/{project-id}/`:

```text
voar-prime/
  voar-prime.en.md
  voar-prime.pt.md
  voar-prime.fr.md
  images/
    .gitkeep
```

Edit each language independently. English originals were preserved during migration; translated templates contain no invented project facts. The site's language selector switches the document automatically.

```json
{
  "kind": "project",
  "id": "voar-prime",
  "name": "Voar Prime",
  "description": {
    "en": "Your description",
    "pt": "Sua descrição",
    "fr": "Votre description"
  },
  "markdown": {
    "en": "assets/projects/voar-prime/voar-prime.en.md",
    "pt": "assets/projects/voar-prime/voar-prime.pt.md",
    "fr": "assets/projects/voar-prime/voar-prime.fr.md"
  }
}
```

The reader route remains `/projects/voar-prime`. Add your images to that project's `images/` folder and reference them in any of its documents:

```md
![Architecture diagram](images/architecture.svg)
```

Translate the image's alternative text in each language. The image file is shared between all three documents. Images placed directly beside a document also work: `![Description](screenshot.png)`. Use portfolio routes such as `/projects/project-id` for links to other project pages.

All displayed localized fields must have EN, PT and FR values. The content tests reject missing translations and missing document files. Project names, library identifiers and official event names remain their original proper names.

### Attach a project to an employer

Add the existing catalog ID to the employer:

```json
"projectIds": ["voar-prime", "another-project"]
```

Only add an association when it is correct. Voar Prime is currently unassigned because its employer was not supplied. Each employer's latest role, full description, responsibility groups, achievements and technologies stay in that employer's entry.

## Sports achievements

The `sports` object in `src/assets/content/portfolio.json` is shared by the homepage and `/sports`:

- `achievements` holds each event or ranking once, with a unique ID, year, icon and localized title. `result` and `description` are optional when individual `placements` are provided. The page groups entries by year, newest first; their order within each year follows the JSON.
- `highlightIds` chooses the homepage cards in display order. Every ID must reference an existing achievement.
- `introduction` and `journey` contain the localized sporting biography.
- `image` contains the local asset path, translated alternative text and photo credit, plus the original post URL.

For a meet with multiple results, use one `placements` entry per event. Each entry has a unique ID within the meet, a localized event name and a localized placing. These appear as individual badges; avoid repeating the same results in a description:

```json
"placements": [
  {
    "id": "100-butterfly",
    "event": { "en": "100 m butterfly", "pt": "100 m borboleta", "fr": "100 m papillon" },
    "result": { "en": "1st place", "pt": "1º lugar", "fr": "1re place" }
  }
]
```

The initial record was transcribed from `Base_Arlan/Fontes/CURRÍCULO ESPORTIVO ARLAN.txt`. Swimming events show full names instead of abbreviations: B is butterfly/borboleta, C is backstroke/costas, and L is freestyle/livre; the number is the distance in metres. These conventions are documented in the [ENEBI 2015 swimming study](https://abcm.org.br/anais/enebi/2015/trabalhos.html). The 2016 end-of-season ranking explicitly notes the missing competition name. World Championship qualification is recorded as qualification, without inventing participation or a finish. This page contains achievements only; add new confirmed results to the same array.

The supplied photo is `src/assets/images/arlan-sporting-achievements.jpg`. Replace that asset and its JSON metadata when changing photos; preserve the photographer credit.

## Translate the interface and editorial content

Interface keys are meaningful and grouped by feature: `nav.experience`, `projects.readDocumentation`, `preferences.theme`, and so on. All three dictionaries have matching keys. Unit tests catch missing keys.

Personal copy is stored beside its entity:

```json
"title": {
  "en": "High-performance engineering.",
  "pt": null,
  "fr": null
}
```

Replace `null` with your translation. Never copy English into another language's field just to suppress the fallback notice. A missing or blank translation intentionally uses English. The notice disappears when no relevant translations are missing.

## Add a section or component

1. Add or extend the typed content schema in `core/content/portfolio.schema.ts`.
2. Add the JSON fields and EN/PT/FR labels.
3. Compose an existing shared component when its purpose fits.
4. Put page-specific UI beside its page; move it into `shared` only when multiple pages use it.
5. Run `npm run check` and the browser tests when behavior or layout changes.

## Homepage overview and detail pages

The home sections follow this order: capabilities, recognition, experience/certificates, libraries/projects, sports, connections. The homepage deliberately limits previews:

- Jobs: first three entries in `companies`; keep the current employer first. A preview opens `/work#company-id`, expands that employer, and scrolls to it. It is a link, not a second accordion.
- Certificates: first three IDs in `home.certificateIds`, in that order. The full catalog is at `/work#certificates`.
- Libraries/projects: first four entries in `projects`, in that order. `/projects` still shows the full catalog.
- Sports: first two IDs in `sports.highlightIds`. `/sports` still shows all achievements.

### Capability documentation

Each `home.capabilities` entry has a stable, semantic ID and a localized `markdown` object, with the same rules as project documentation. Its route is `/capabilities/{id}`. The three starting templates are:

- `src/assets/capabilities/performance-engineering/performance-engineering.en.md`
- `src/assets/capabilities/end-to-end-delivery/end-to-end-delivery.en.md`
- `src/assets/capabilities/business-and-engineering/business-and-engineering.en.md`

These are writing prompts, not completed case studies. Replace the bracketed prompts with your own examples and evidence. Set `markdown.pt` and `markdown.fr` when translated files are ready. Capability cards have no icons or secondary footer. Recognition cards use `selection.label` and `selection.value` in their header.

### Technologies

`technologies` is the shared catalog for home and work. Each entry has `id`, `name`, and a Material Symbols `icon`. The list scrolls vertically and can be focused with the keyboard. Include technologies used in actual work or independent projects; a training certificate alone does not establish professional use. Company-specific technology lists remain with their company records.

### Certificates

`certificates` contains each credential once. Fields:

- `id`: stable unique ID, using the credential ID where available.
- `title`: localized text. `null` translations use the English title until supplied.
- `provider`: issuing institution.
- `kind`: `course` or `path` (learning path).
- `category`: `backend`, `frontend`, `accessibility`, `design`, `data`, `devops`, or `business`.
- `issued`: `YYYY-MM`, preserving the precision of the source; no invented day.
- `hours`: optional, only when verified.
- `url`: HTTPS credential link, or `null` for a record without a public link.

The work page combines search, subject and type filters, searches all supplied title translations, and ignores case/accents. It shows twelve matching records at a time; “Show more certificates” reveals another twelve. Home and work reuse the same certificate card. Cards without URLs stay non-interactive.

See `docs/CERTIFICATE_SOURCES.md` for the initial catalog provenance. Learning paths may share courses: do not add their hours as a unique total or present preparation courses as vendor certifications.

### Connections

`profile.socialLinks` drives the connection cards and footer links. Each entry contains `label`, `icon`, localized `description`, and `url`. Use HTTPS for profiles or a plain `mailto:address` for email. Email opens the user's email handler; profiles open a new tab. The same validation does not permit email links as library or certificate URLs.

Capability documents follow the same naming convention: `src/assets/capabilities/{id}/{id}.{language}.md`, with a shared `images/` folder.
