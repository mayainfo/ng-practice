import { Route } from '@angular/router';
import { ShellComponent } from './shell.component';

export const shellRoutes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../products/products.component').then(
            (m) => m.ProductsComponent,
          ),
      },
      {
        path: ':productId',
        loadComponent: () =>
          import('../products/product-detail.component').then(
            (m) => m.ProductDetailComponent,
          ),
      },
    ],
  },
];
