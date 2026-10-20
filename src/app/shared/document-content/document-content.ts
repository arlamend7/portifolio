import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LocalizedMarkdown } from '../../core/content/portfolio.schema';
import { LocaleStore } from '../../core/i18n/locale-store';
import { MarkdownReader } from '../markdown-reader/markdown-reader';
@Component({
  selector: 'app-document-content',
  imports: [TranslatePipe, MarkdownReader],
  templateUrl: './document-content.html',
  styleUrl: './document-content.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentContent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly markdown = input.required<LocalizedMarkdown>();
  private readonly locale = inject(LocaleStore);
  protected readonly source = computed(
    () => this.markdown()[this.locale.current()] || this.markdown().en,
  );
  protected readonly usingFallback = computed(
    () => this.locale.current() !== 'en' && !this.markdown()[this.locale.current()],
  );
}
