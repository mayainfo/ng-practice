import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';

export const ButtonColor = {
  Primary: 'primary',
  PrimaryBorder: 'primary-border',
  Secondary: 'secondary',
  // Tertiary: 'tertiary',
  SecondaryBorder: 'secondary-border',
  Disabled: 'disabled',
  Delete: 'delete',
} as const;
export type ButtonColor = (typeof ButtonColor)[keyof typeof ButtonColor];

// TODO: disabled color
@Component({
  selector: 'button[app-button], a[app-button]',
  imports: [],
  standalone: true,
  template: ` <ng-content /> `,
  styles: `
    .btn-primary {
      color: var(--tertiary);
      background-color: var(--primary);
      border-color: var(--primary);
    }

    .btn-primary:hover,
    .btn-primary.btn-active {
      color: white;
      background-color: var(--secondary);
      border-color: var(--secondary);
    }

    .btn-primary-border {
      color: var(--primary);
      background-color: transparent;
      border-color: var(--primary);
    }

    .btn-primary-border:hover,
    .btn-primary-border.btn-active {
      color: var(--secondary);
      background-color: var(--tertiary);
      border-color: var(--secondary);
    }

    .btn-secondary {
      color: var(--tertiary);
      background-color: var(--secondary);
      border-color: var(--secondary);
    }

    .btn-primary:hover,
    .btn-primary.btn-active {
      color: white;
      background-color: var(--secondary);
      border-color: var(--secondary);
    }

    .btn-secondary-border {
      color: var(--secondary);
      background-color: transparent;
      border-color: var(--secondary);
    }

    .btn-secondary-border:hover,
    .btn-secondary-border.btn-active {
      color: var(--secondary);
      background-color: var(--tertiary);
      border-color: var(--secondary);
    }

    /*.btn-tertiary {*/
    /*  color: var(--secondary);*/
    /*  background-color: var(--tertiary);*/
    /*  border-color: var(--tertiary);*/
    /*}*/

    /*.btn-tertiary:hover,*/
    /*.btn-tertiary.btn-active {*/
    /*  color: white;*/
    /*  background-color: var(--primary);*/
    /*  border-color: var(--primary);*/
    /*}*/

    .btn-delete {
      color: var(--danger);
      background-color: white;
      border-color: var(--danger);
    }

    .btn-delete:hover,
    .btn-delete.btn-active {
      color: white;
      background-color: var(--danger);
      border-color: var(--danger);
    }

    .btn-disabled {
      color: dimgray;
      background-color: lightgray;
      border-color: lightgray;
    }
  `,
  host: {
    class:
      'uppercase border rounded-md px-6 py-1 text-base flex items-center justify-center hover:cursor-pointer',
    '[class.btn-primary]': 'color() === ButtonColor.Primary',
    '[class.btn-primary-border]': 'color() === ButtonColor.PrimaryBorder',
    '[class.btn-secondary]': 'color() === ButtonColor.Secondary',
    '[class.btn-secondary-border]': 'color() === ButtonColor.SecondaryBorder',
    // '[class.btn-tertiary]': 'color() === ButtonColor.Tertiary',
    '[class.btn-disabled]': 'color() === ButtonColor.Disabled',
    '[class.btn-delete]': 'color() === ButtonColor.Delete',
    '[class.btn-active]': 'active()',
    '[class.transition-all]': 'enableTransition()',
    '[class.duration-200]': 'enableTransition()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  color = input.required<ButtonColor>();
  active = input(false, {
    transform: booleanAttribute,
  });

  enableTransition = signal(false);

  constructor() {
    afterNextRender({
      read: () => {
        setTimeout(() => {
          // Enable transition after the first render
          // to prevent the initial animation
          this.enableTransition.set(true);
        }, 0);
      },
    });
  }

  protected readonly ButtonColor = ButtonColor;
}
