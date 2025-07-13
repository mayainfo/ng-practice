import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';

import { LayoutComponent } from './layout.component';

@Component({
  selector: 'app-shell',
  template: `
    <app-layout>
      <router-outlet />
    </app-layout>
    <ngx-sonner-toaster position="bottom-right" richColors />
  `,
  styles: [],
  imports: [LayoutComponent, RouterOutlet, NgxSonnerToaster],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {}
