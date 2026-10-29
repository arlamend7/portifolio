# Theme-aware diagrams

Capability diagrams use SVG with semantic CSS variables: `--surface`, `--surface-low`, `--text`, `--text-muted`, `--border`, `--diagram-accent`, and `--diagram-on-accent`. The last two follow the header accent picker, with theme-appropriate defaults. They inherit the active page palette and participate in the existing theme wave without separate animation code.

Edit the localized SVG files under `src/assets/capabilities/*/images/`. Run `npm run diagrams:build` after edits. This is also run before `npm start`, `npm run build`, and `npm test`. When editing during an already running development session, run it manually to refresh the registry.

The generated JSON registry is bundled with the Markdown renderer. Only exact repository-owned URLs from this allowlist are inlined; arbitrary SVGs and external images remain ordinary image elements. The generator rejects scripts, event handlers, foreign content, stylesheets, and linked resources. Do not add unreviewed third-party SVG content. IDs are namespaced per rendered diagram, and the Markdown alternative text supplies its accessible label.

Original PNG artwork is retained as source material. The Markdown now uses translated vector versions of the SMTP and umbrella illustrations. Photographs keep their original colors.
