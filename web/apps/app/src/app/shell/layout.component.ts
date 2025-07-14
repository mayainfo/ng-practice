import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  template: `
    <div
      class="fixed left-0 right-0 top-0 z-20 flex h-12 w-full items-center justify-between bg-gray-300 px-20"
    >
      <a routerLink="/">示範網站</a>
      <a routerLink="table">選擇商品</a>
    </div>
    <div class="h-screen w-full">
      <div class="mt-12 overflow-y-auto px-20 py-8">
        <router-outlet />
      </div>
    </div>
  `,
  styles: [],
  imports: [RouterOutlet, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
