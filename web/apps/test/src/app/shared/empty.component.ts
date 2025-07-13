import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-empty',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  template: `
    <div class="flex w-full flex-col items-center gap-4">
      <p class="tracking-wider text-zinc-400">{{ message() }}</p>
      <svg-icon src="assets/empty.svg" class="aspect-square w-36"></svg-icon>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyComponent {
  message = input.required<string>();
}
