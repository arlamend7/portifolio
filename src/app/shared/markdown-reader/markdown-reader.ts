import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, combineLatest, map, of, startWith, switchMap } from 'rxjs';
import { LocaleStore } from '../../core/i18n/locale-store';
import { renderMarkdown } from './markdown-engine';

interface LoadResult {
  status: 'loading' | 'ready' | 'error';
  source: string;
  baseUrl: string;
}

@Component({
  selector: 'app-markdown-reader',
  imports: [TranslatePipe],
  templateUrl: './markdown-reader.html',
  styleUrl: './markdown-reader.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownReader {
  readonly source = input.required<string>();
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly translate = inject(TranslateService);
  private readonly locale = inject(LocaleStore);
  private readonly attempt = signal(0);
  protected readonly copyStatus = signal('');

  protected readonly result = toSignal(
    combineLatest([toObservable(this.source), toObservable(this.attempt)]).pipe(
      switchMap(([path]) => {
        const baseUrl = new URL(path, this.document.baseURI).href;
        if (!/^assets\/[a-zA-Z0-9/_-]+\.md$/.test(path)) {
          return of<LoadResult>({ status: 'error', source: '', baseUrl });
        }
        return this.http.get(path, { responseType: 'text', observe: 'response' }).pipe(
          map((response) => {
            if (response.headers.get('content-type')?.includes('text/html'))
              throw new Error('Expected Markdown, received HTML.');
            return { status: 'ready', source: response.body || '', baseUrl } satisfies LoadResult;
          }),
          startWith<LoadResult>({ status: 'loading', source: '', baseUrl }),
          catchError(() => of<LoadResult>({ status: 'error', source: '', baseUrl })),
        );
      }),
    ),
    { initialValue: { status: 'loading', source: '', baseUrl: '' } as LoadResult },
  );

  protected readonly rendered = computed(() => {
    this.locale.current();
    const result = this.result();
    if (result.status !== 'ready') return null;
    const rendered = renderMarkdown(
      result.source,
      result.baseUrl,
      this.translate.instant('projects.copy') as string,
    );
    // This is the single trust boundary: markdown-it has raw HTML disabled and the
    // engine only emits escaped attributes, validated URLs and highlighted code.
    return { ...rendered, safeHtml: this.sanitizer.bypassSecurityTrustHtml(rendered.html) };
  });

  protected retry(): void {
    this.attempt.update((value) => value + 1);
  }

  protected followHeading(event: Event, id: string): void {
    event.preventDefault();
    this.document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
  }

  protected async activateContent(event: MouseEvent): Promise<void> {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLButtonElement>('button[data-code-index]');
    if (button) {
      const code = this.rendered()?.codeBlocks[Number(button.dataset['codeIndex'])];
      if (code === undefined) return;
      try {
        await navigator.clipboard.writeText(code);
        this.copyStatus.set('projects.copied');
      } catch {
        this.copyStatus.set('projects.copyError');
      }
      return;
    }
    const anchor = event.target.closest('a');
    const href = anchor?.getAttribute('href');
    if (href?.startsWith('#')) this.followHeading(event, href.slice(1));
  }
}
