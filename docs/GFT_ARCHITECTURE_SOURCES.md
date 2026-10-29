# GFT insurance platform architecture

Source: https://chatgpt.com/s/t_6ae3c5fbc3d08191a4d01080990fdf78 (shared case study), read 2026-10-29, and the user's two supplied sketches.

The overview combines the case study's Azure Functions, Cosmos DB, Key Vault and private Redis context flow with the sketch's queue, reporting workers and reporting-system route. Queue implementation, identity provider and Redis hosting product are deliberately unspecified. No Service Bus, Entra ID, Redis expiry policy or exact deployment topology is claimed. The second diagram represents the handler, smart enum and common integration interface shown in the second sketch.

Official icons were obtained from Microsoft Azure Architecture Center:
https://learn.microsoft.com/en-us/azure/architecture/icons/
https://arch-center.azureedge.net/icons/Azure_Public_Service_Icons_V24.zip

Embedded icons, with original geometry and colors:
- compute/10029-icon-service-Function-Apps.svg
- databases/10121-icon-service-Azure-Cosmos-DB.svg
- security/10245-icon-service-Key-Vaults.svg

Microsoft permits these icons in architecture diagrams and documentation and reserves other rights. These icons represent only the named Microsoft services. Other components use generic cards. The icons are scaled proportionately; internal IDs are namespaced to avoid collisions. Surrounding cards, text and arrows use the portfolio theme tokens.

Localized diagrams live under `src/assets/projects/gft-life-insurance-sales-platform/images/`. Run `npm run diagrams:build` after edits to refresh the Markdown renderer's trusted registry.
