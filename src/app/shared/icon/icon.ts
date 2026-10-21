import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `
    @if (brand(); as slug) {
      <span
        class="brand-icon"
        aria-hidden="true"
        [style.mask-image]="'url(assets/icons/brands/' + slug + '.svg)'"
      ></span>
    } @else {
      <span class="material-symbols-outlined" aria-hidden="true">{{ name() }}</span>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      vertical-align: middle;
      flex-shrink: 0;
    }
    span {
      font-size: 20px;
      width: 20px;
      height: 20px;
      overflow: hidden;
    }
    .brand-icon {
      display: block;
      width: 20px;
      height: 20px;
      background-color: currentColor;
      mask-size: contain;
      mask-position: center;
      mask-repeat: no-repeat;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  readonly name = input.required<string>();
  readonly brand = input<string>();
}
