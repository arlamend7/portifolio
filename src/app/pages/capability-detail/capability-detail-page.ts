import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PortfolioStore } from '../../core/content/portfolio-store';
import { LocaleStore } from '../../core/i18n/locale-store';
import { LocalizedTextPipe } from '../../core/i18n/localized-text.pipe';
import { DocumentContent } from '../../shared/document-content/document-content';
@Component({
  selector: 'app-capability-detail-page',
  imports: [RouterLink, TranslatePipe, LocalizedTextPipe, DocumentContent],
  templateUrl: './capability-detail-page.html',
  styleUrl: './capability-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CapabilityDetailPage {
  private readonly store = inject(PortfolioStore);
  private readonly route = inject(ActivatedRoute);
  private readonly params = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });
  protected readonly locale = inject(LocaleStore);
  protected readonly capability = computed(() =>
    this.store.portfolio()?.home.capabilities.find((item) => item.id === this.params().get('id')),
  );
}
