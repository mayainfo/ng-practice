import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  template: `
    <div class="flex h-12 items-center justify-between bg-gray-300 px-20">
      <a routerLink="/">示範網站</a>
      <a routerLink="table">選擇商品</a>
    </div>
    <div class="px-20 py-8">
      <router-outlet />
    </div>
  `,
  styles: [],
  imports: [RouterOutlet, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
