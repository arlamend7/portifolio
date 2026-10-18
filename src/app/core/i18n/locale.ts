export const supportedLocales = ['en', 'pt', 'fr'] as const;
export type Locale = (typeof supportedLocales)[number];
