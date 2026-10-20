import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProjectEntry } from '../../core/content/portfolio.schema';
import { ProjectCard } from '../project-card/project-card';

@Component({
  selector: 'app-project-grid',
  imports: [ProjectCard],
  templateUrl: './project-grid.html',
  styleUrl: './project-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectGrid {
  readonly projects = input.required<readonly ProjectEntry[]>();
}
