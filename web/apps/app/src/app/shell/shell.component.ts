import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LayoutComponent } from './layout.component';

@Component({
  selector: 'app-shell',
  template: `
    <app-layout>
      <router-outlet />
    </app-layout>
  `,
  styles: [],
  imports: [LayoutComponent, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {}
