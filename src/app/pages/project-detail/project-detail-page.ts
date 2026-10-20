import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PortfolioStore } from '../../core/content/portfolio-store';
import { LocaleStore } from '../../core/i18n/locale-store';
import { LocalizedTextPipe } from '../../core/i18n/localized-text.pipe';
import { DocumentContent } from '../../shared/document-content/document-content';

@Component({
  selector: 'app-project-detail-page',
  imports: [RouterLink, TranslatePipe, LocalizedTextPipe, DocumentContent],
  templateUrl: './project-detail-page.html',
  styleUrl: './project-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly params = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });
  protected readonly store = inject(PortfolioStore);
  protected readonly locale = inject(LocaleStore);
  protected readonly project = computed(() =>
    this.store
      .portfolio()
      ?.projects.find(
        (project) => project.id === this.params().get('id') && project.kind === 'project',
      ),
  );
  protected readonly documentProject = computed(() => {
    const project = this.project();
    return project?.kind === 'project' ? project : null;
  });
  protected readonly company = computed(() =>
    this.store
      .portfolio()
      ?.companies.find((company) => company.projectIds.includes(this.params().get('id') || '')),
  );
}
