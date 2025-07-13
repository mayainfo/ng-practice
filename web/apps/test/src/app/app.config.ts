import {
  HttpErrorResponse,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
  withRouterConfig,
} from '@angular/router';
import { provideAppTitle } from '@app/common/seo/ui/title';
import {
  provideTanStackQuery,
  QueryClient,
  withDevtools,
} from '@tanstack/angular-query-experimental';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideNgxSkeletonLoader } from 'ngx-skeleton-loader';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideHttpClient(withFetch(), withInterceptors([])),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', subscriptSizing: 'dynamic' },
    },

    provideAngularSvgIcon(),
    provideTanStackQuery(
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: (count, error) => {
              if (error instanceof HttpErrorResponse) {
                if (error.status >= 400 && error.status < 500) {
                  return false;
                }
              }
              return count < 2;
            },
          },
          mutations: {
            retry: (count, error) => {
              if (error instanceof HttpErrorResponse) {
                if (error.status >= 400 && error.status < 500) {
                  return false;
                }
              }
              return count < 2;
            },
          },
        },
      }),
      withDevtools(),
    ),
    provideNgxSkeletonLoader({
      theme: {
        extendsFromRoot: true,
        height: '30px',
      },
    }),

    provideAppTitle('示範網站'),
  ],
};
