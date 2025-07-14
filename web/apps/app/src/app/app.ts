import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSonnerToaster],
  template: `
    <router-outlet />
    <ngx-sonner-toaster position="bottom-right" richColors />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
