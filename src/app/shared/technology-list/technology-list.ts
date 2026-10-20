import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Technology } from '../../core/content/portfolio.schema';
import { Icon } from '../icon/icon';
@Component({
  selector: 'app-technology-list',
  imports: [Icon, TranslatePipe],
  templateUrl: './technology-list.html',
  styleUrl: './technology-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologyList {
  readonly technologies = input.required<Technology[]>();
  readonly horizontal = input(false);
}
