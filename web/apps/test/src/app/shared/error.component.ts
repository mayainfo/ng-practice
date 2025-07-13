import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  standalone: true,
  template: `
    <div class="flex w-full justify-center">
      <p class="text-red-500">發生錯誤，請稍後重新再試。</p>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  error = input.required();
}
