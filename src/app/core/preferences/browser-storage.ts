import { Injectable } from '@angular/core';

/** Preferences are optional: restricted storage must never stop the application. */
@Injectable({ providedIn: 'root' })
export class BrowserStorage {
  read(key: string): string | null {
    try {
      return localStorage.getItem(`arlan.${key}`);
    } catch {
      return null;
    }
  }

  write(key: string, value: string): void {
    try {
      localStorage.setItem(`arlan.${key}`, value);
    } catch {
      /* Session-only preference. */
    }
  }
}
