# Architecture and verification

## Problems addressed

The initial prototype mixed loading, preferences, Markdown processing and routing into page classes. It had generated sentence-based translation keys, duplicated project descriptions, oversized templates, unsafe persistence assumptions, unhandled locale races, and manual subscription lifetimes.

The refactor introduces explicit domain contracts and focused UI boundaries rather than only moving the same files into folders.

## Responsibilities

| Area               | Responsibility                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------- |
| `core/content`     | Valibot schemas, inferred TypeScript types, content integrity checks and a cancellable HTTP store       |
| `core/i18n`        | ngx-translate integration, persisted EN/PT/FR selection, localized personal text and fallback detection |
| `core/preferences` | Guarded browser storage, contrast-aware themes and shared dialog state                                  |
| `pages`            | Route-specific composition; each page is loaded lazily                                                  |
| `shared`           | Reusable presentation and reading components with explicit signal inputs and outputs                    |
| `assets`           | Portfolio JSON, UI dictionaries, Markdown files and media                                               |

No application-wide catch-all utility or generic base component was introduced. Framework subscriptions use `toSignal`, `switchMap`, or `takeUntilDestroyed`. Loading results and content are readonly to consumers. Types are inferred from the validation schema so runtime and compile-time contracts cannot drift independently.

## Packages and projects

`kind: "package"` opens the supplied HTTPS library URL. It can infer a display name from the URL and does not require Markdown or a detail route.

`kind: "project"` has an explicit local Markdown path per locale. Companies reference project IDs instead of duplicating project objects. Duplicate IDs, broken company references and unsafe document paths fail validation.

## Reader boundary

The project page chooses the document; `MarkdownReader` loads and presents it; the pure `markdown-engine.ts` handles parsing and safe output. It uses current markdown-it and a limited set of highlight.js languages, loaded with the project route. Unsupported languages remain readable escaped code.

Raw HTML is disabled, so Markdown cannot introduce script, event-handler, iframe or form elements. The engine escapes generated attribute values, permits only HTTP(S) resource URLs and mail links, resolves relative paths, and adds safe external-link attributes. Its output passes through one documented Angular trusted-HTML boundary to preserve generated anchor IDs and code controls. Unit and browser tests exercise this boundary.

## Appearance and accessibility

The Stitch typography and palette are represented by CSS custom properties. Components have scoped SCSS. Light, dark and custom modes share the same layout. Custom filled controls choose black or white text using relative luminance. The preferences dialog uses the browser's modal focus behavior and Escape handling. Accordions expose `aria-expanded`, panel relationships and keyboard-operable native buttons.

The cadence bars are decorative and hidden from assistive technology. Source content and actual sports results remain separate. UI translations are complete; personal translations and project documentation remain supplied-content tasks.

## Verification

- Strict TypeScript and Angular template compilation.
- ESLint TypeScript/Angular/template checks, including accessibility rules. The only scoped template exception is a delegated click listener for native links and buttons inside generated Markdown.
- Prettier formatting.
- Unit tests for content integrity, URL-only package entries, translated document paths, language fallback, Markdown safety, heading uniqueness, syntax highlighting and custom-theme contrast.
- Browser tests for shared navigation, single-open employers, direct links, close-all persistence, all three languages, theme persistence, external package links, company project navigation, Markdown copying, loading failures, retry and mobile overflow.

A compatible isolated Node 24 runtime was used for local verification; no system Node installation was changed. Dependency versions and resolved integrity hashes are retained in `package-lock.json`.

## References

- [Angular version compatibility](https://angular.dev/reference/versions)
- [Angular coding style guide](https://angular.dev/style-guide)
- [markdown-it](https://github.com/markdown-it/markdown-it)
- [User's web-markdown-wiki package manifest](https://github.com/arlamend7/web-markdown-wiki/blob/master/package.json)
- [ngx-translate configuration](https://ngx-translate.org/reference/configuration/)
