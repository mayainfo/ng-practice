import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { ProductsQueryService } from './data-access/products.query';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <a
          routerLink=".."
          class="w-fit rounded-md border border-yellow-800 px-4 py-0.5 text-yellow-800 hover:bg-yellow-200"
          >返回上一頁</a
        >
        <a
          routerLink="edit"
          class="w-fit rounded-md border border-yellow-800 px-4 py-0.5 text-yellow-800 hover:bg-yellow-200"
          >編輯</a
        >
      </div>
      @if (productQueryById.isPending()) {
        <div class="grid grid-cols-2 gap-8">
          <ngx-skeleton-loader
            class="aspect-[4/3] w-full rounded-md"
            [theme]="{ extendsFromRoot: true, height: '100%' }"
          ></ngx-skeleton-loader>
          <div class="flex flex-col gap-6">
            <ngx-skeleton-loader
              class="h-4 w-1/2"
              [theme]="{ extendsFromRoot: true }"
            ></ngx-skeleton-loader>
            <ngx-skeleton-loader
              class="h-4 w-1/3"
              [theme]="{ extendsFromRoot: true }"
            ></ngx-skeleton-loader>
            <ngx-skeleton-loader
              class="h-4 w-full"
              [theme]="{ extendsFromRoot: true }"
            ></ngx-skeleton-loader>
            <ngx-skeleton-loader
              class="h-4 w-full"
              [theme]="{ extendsFromRoot: true }"
            ></ngx-skeleton-loader>
            <ngx-skeleton-loader
              class="h-4 w-1/4"
              [theme]="{ extendsFromRoot: true }"
            ></ngx-skeleton-loader>
          </div>
        </div>
      } @else if (productQueryById.isError()) {
        error
      } @else {
        @if (productQueryById.data(); as product) {
          <div class="grid grid-cols-2 gap-8">
            @if (product.images[0]) {
              <img
                [src]="product.images[0]"
                class="aspect-[4/3] w-full rounded-md"
                alt=""
              />
            } @else {
              <div class="aspect-[4/3] w-full rounded-md bg-gray-200"></div>
            }
            <div class="flex flex-col gap-2">
              <p class="text-lg font-bold">{{ product.title }}</p>
              <div
                class="w-fit rounded-full border border-yellow-800 px-2 py-0.5 text-xs"
              >
                {{ product.category.name }}
              </div>
              <p>{{ product.slug }}</p>
              <p>{{ product.description }}</p>
              <div class="flex items-center justify-between">
                <p class="text-lg text-red-500">
                  {{ product.price | currency }}
                </p>
              </div>
            </div>
          </div>
        }
      }
    </div>
  `,
  styles: [],
  standalone: true,
  imports: [CurrencyPipe, JsonPipe, NgxSkeletonLoaderComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  #productsQueryService = inject(ProductsQueryService);

  productId = input.required({
    transform: numberAttribute,
  });

  productQueryById = injectQuery(() =>
    this.#productsQueryService.productQueryById(this.productId()),
  );
}
