import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';

import { ButtonComponent } from './button.component';

@Component({
  selector: 'app-page-not-found',
  imports: [SvgIconComponent, ButtonComponent, RouterLink],
  template: `
    <div class="text-primary flex flex-col items-center gap-4 pt-20">
      <div class="flex flex-col items-center">
        <p>抱歉，我們找不到您要查找的頁面</p>
        <p>不過別擔心，返回首頁重新出發即可</p>
      </div>

      <div class="aspect-square w-1/4">
        <svg-icon src="assets/404.svg"></svg-icon>
      </div>
      <button app-button color="primary" routerLink="/" class="mt-6">
        返回首頁
      </button>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {}
