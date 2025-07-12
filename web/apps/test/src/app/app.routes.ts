import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path:'',
    loadChildren: () => import('./shell/shell.routes').then(m => m.shellRoutes)
  }
];
