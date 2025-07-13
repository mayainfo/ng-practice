import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  standalone: true,
  template: `
    <div
      class="bg-other flex h-full w-full flex-col items-center justify-center gap-4 p-8"
    >
      <p>正在載入中，請稍候...</p>
      <!--      <img src="assets/loading.gif" class="mx-auto aspect-square w-40" />-->
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {}
