import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LocaleStore } from '../../core/i18n/locale-store';
import { ReadingPreferencesStore } from '../../core/preferences/reading-preferences-store';
import { Theme, ThemeStore } from '../../core/preferences/theme-store';

@Component({
  selector: 'app-reading-preferences',
  imports: [TranslatePipe],
  templateUrl: './reading-preferences.html',
  styleUrl: './reading-preferences.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadingPreferences {
  private readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('dialog');
  protected readonly themes: readonly Theme[] = ['light', 'dark', 'custom'];
  protected readonly theme = inject(ThemeStore);
  protected readonly locale = inject(LocaleStore);

  protected readonly state = inject(ReadingPreferencesStore);

  constructor() {
    effect(() => {
      const dialog = this.dialog()?.nativeElement;
      if (!dialog) return;
      if (this.state.isOpen() && !dialog.open) dialog.showModal();
      if (!this.state.isOpen() && dialog.open) dialog.close();
    });
  }

  open(): void {
    this.state.open();
  }
  protected close(): void {
    this.state.close();
  }
  protected changeAccent(event: Event): void {
    if (event.target instanceof HTMLInputElement) this.theme.changeAccent(event.target.value);
  }
}
