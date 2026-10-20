import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Portfolio } from '../../../core/content/portfolio.schema';
import { LocaleStore } from '../../../core/i18n/locale-store';
import { LocalizedTextPipe } from '../../../core/i18n/localized-text.pipe';
import { Icon } from '../../../shared/icon/icon';

@Component({
  selector: 'app-language-tests',
  imports: [DatePipe, TranslatePipe, LocalizedTextPipe, Icon],
  templateUrl: './language-tests.html',
  styleUrl: './language-tests.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageTests {
  readonly tests = input.required<Portfolio['home']['languageTests']>();
  protected readonly locale = inject(LocaleStore);
}
