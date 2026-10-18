import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PortfolioStore } from '../../core/content/portfolio-store';
import { ProjectCard } from '../../shared/project-card/project-card';

@Component({
  selector: 'app-projects-page',
  imports: [TranslatePipe, ProjectCard],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPage {
  protected readonly store = inject(PortfolioStore);
}
