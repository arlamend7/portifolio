import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PortfolioStore } from '../../core/content/portfolio-store';
import { CompanyCard } from './company-card/company-card';
import { CertificateCatalog } from './certificate-catalog/certificate-catalog';
import { SectionHeading } from '../../shared/section-heading/section-heading';
import { TechnologyList } from '../../shared/technology-list/technology-list';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-experience-page',
  imports: [TranslatePipe, CompanyCard, Icon, CertificateCatalog, SectionHeading, TechnologyList],
  templateUrl: './experience-page.html',
  styleUrl: './experience-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperiencePage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly store = inject(PortfolioStore);
  private readonly fragment = toSignal(this.route.fragment, {
    initialValue: this.route.snapshot.fragment,
  });

  protected readonly expandedId = computed(() => {
    const data = this.store.portfolio();
    const fragment = this.fragment();
    if (fragment === 'all-closed') return null;
    return data?.companies.some((company) => company.id === fragment) ? fragment : null;
  });
  protected readonly companyViews = computed(() => {
    const data = this.store.portfolio();
    return (
      data?.companies.map((company) => ({
        company,
        projects: data.projects.filter((project) => company.projectIds.includes(project.id)),
      })) ?? []
    );
  });

  protected toggleCompany(id: string): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      fragment: this.expandedId() === id ? 'all-closed' : id,
      queryParamsHandling: 'preserve',
      replaceUrl: true,
    });
  }
}
