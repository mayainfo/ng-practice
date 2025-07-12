import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  template: `
    <div class="flex h-12 w-full items-center bg-gray-300 px-20">header</div>
    <div class="px-20 py-8">
      <router-outlet />
    </div>
  `,
  styles: [],
  standalone: true,
  imports: [RouterOutlet],
})
export class LayoutComponent {}
