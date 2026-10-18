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

### A project: a local Markdown document

```json
{
  "kind": "project",
  "id": "voar-prime",
  "name": "Voar Prime",
  "description": {
    "en": "Your description",
    "pt": null,
    "fr": null
  },
  "markdown": {
    "en": "assets/voar-prime.md",
    "pt": null,
    "fr": null
  }
}
```

Write the full document in `src/assets/voar-prime.md`. It is served at `/assets/voar-prime.md` and rendered at `/projects/voar-prime`. No component changes are required.

For translations, create files such as `src/assets/pt/voar-prime.md` and `src/assets/fr/voar-prime.md`, then set the corresponding JSON paths. Until those files exist, leave their paths `null`; the reader displays the English document with a translated fallback notice.

Relative assets resolve against the Markdown file:

```md
![Architecture diagram](images/voar-prime-architecture.svg)
```

For `assets/voar-prime.md`, place that image at `src/assets/images/voar-prime-architecture.svg`. Use a meaningful alt description. A link to another Markdown file is a normal asset link; use `/projects/project-id` when you want a link to another portfolio reader page.

### Attach a project to an employer

Add the existing catalog ID to the employer:

```json
"projectIds": ["voar-prime", "another-project"]
```

Only add an association when it is correct. Voar Prime is currently unassigned because its employer was not supplied. Each employer's latest role, full description, responsibility groups, achievements and technologies stay in that employer's entry.

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
