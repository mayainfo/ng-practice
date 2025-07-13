import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-shell',
  template: `
    <app-layout>
      <router-outlet />
    </app-layout>
    <ngx-sonner-toaster position="bottom-right" richColors />
  `,
  styles: [],
  standalone: true,
  imports: [LayoutComponent, RouterOutlet, NgxSonnerToaster],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {}
