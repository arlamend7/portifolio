import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, Subject, catchError, startWith, switchMap, tap } from 'rxjs';
import type { Portfolio } from './portfolio.schema';

@Injectable({ providedIn: 'root' })
export class PortfolioStore {
  private readonly http = inject(HttpClient);
  private readonly reloadRequests = new Subject<void>();
  private readonly content = signal<Portfolio | null>(null);
  private readonly loadState = signal<'loading' | 'ready' | 'error'>('loading');

  readonly portfolio = this.content.asReadonly();
  readonly status = this.loadState.asReadonly();

  constructor() {
    this.reloadRequests
      .pipe(
        startWith(undefined),
        tap(() => this.loadState.set('loading')),
        switchMap(() =>
          this.http.get<unknown>('assets/content/portfolio.json').pipe(
            switchMap(async (response) => {
              const { parsePortfolio } = await import('./portfolio.schema');
              return parsePortfolio(response);
            }),
            tap((portfolio) => {
              this.content.set(portfolio);
              this.loadState.set('ready');
            }),
            catchError(() => {
              this.loadState.set('error');
              return EMPTY;
            }),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  reload(): void {
    this.reloadRequests.next();
  }
}
