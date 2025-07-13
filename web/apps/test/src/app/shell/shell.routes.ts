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
        path: 'new',
        loadComponent: () =>
          import('../products/product-detail-edit.component').then(
            (m) => m.ProductDetailEditComponent,
          ),
      },
      {
        path: 'table',
        loadComponent: () =>
          import('../table-selection/table.component').then(
            (m) => m.TableComponent,
          ),
      },

      {
        path: ':productId',
        loadComponent: () =>
          import('../products/product-detail.component').then(
            (m) => m.ProductDetailComponent,
          ),
      },

      {
        path: ':productId/edit',
        loadComponent: () =>
          import('../products/product-detail-edit.component').then(
            (m) => m.ProductDetailEditComponent,
          ),
      },
      {
        path: '**',
        loadComponent: () =>
          import('../shared/page-not-found.component').then(
            (m) => m.PageNotFoundComponent,
          ),
      },
    ],
  },
];
