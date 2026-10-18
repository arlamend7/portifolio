import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: '<span class="material-symbols-outlined" aria-hidden="true">{{ name() }}</span>',
  styles: ':host { display: inline-flex; vertical-align: middle; } span { font-size: 20px; }',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  readonly name = input.required<string>();
}
