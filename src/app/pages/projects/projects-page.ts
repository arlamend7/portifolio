import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PortfolioStore } from '../../core/content/portfolio-store';
import { ProjectGrid } from '../../shared/project-grid/project-grid';

@Component({
  selector: 'app-projects-page',
  imports: [TranslatePipe, ProjectGrid],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPage {
  protected readonly store = inject(PortfolioStore);
}
