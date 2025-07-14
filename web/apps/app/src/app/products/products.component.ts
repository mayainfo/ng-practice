import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { ProductCategoryQueryService } from './data-access/product-category.query';
import { ProductsQueryService } from './data-access/products.query';
import { ProductCardComponent } from './product-card.component';
import { ProductParamsService } from './product-params.service';

@Component({
  selector: 'app-products',
  template: `
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold">產品列表</h1>
      <div class="flex items-center gap-8">
        <div class="flex items-center gap-4">
          <p>連動的搜尋</p>
          <input
            type="text"
            placeholder="搜尋產品"
            class="rounded-md border px-4 py-0.5"
            [(ngModel)]="search"
          />
        </div>
        <div class="flex items-center gap-4">
          <p>不連動的搜尋</p>
          <input
            type="text"
            placeholder="搜尋產品"
            class="rounded-md border px-4 py-0.5"
            [(ngModel)]="searchInput"
          />
          <button
            (click)="setSearchInput()"
            class="rounded-md bg-yellow-400 px-2 py-0.5 hover:bg-yellow-600"
          >
            搜尋
          </button>
          <button
            (click)="resetSearch()"
            class="rounded-md bg-gray-200 px-2 py-0.5 hover:bg-gray-400"
          >
            重置
          </button>
        </div>
      </div>
      <a
        routerLink="new/edit"
        class="rounded-md border border-yellow-950 px-4 py-0.5"
      >
        新增
      </a>
    </div>
    <div class="mt-4 grid grid-cols-[14rem_auto] gap-8">
      <div class="flex flex-col gap-2">
        <p class="text-gray-600">分類</p>
        <div class="flex flex-col">
          @if (categoriesQuery.isPending()) {
            loading
          } @else if (categoriesQuery.isError()) {
            error
          } @else {
            @if (categoriesQuery.data(); as categories) {
              <button
                class="w-full rounded-md px-4 py-0.5 text-start"
                (click)="clearParams(); categoryParams.set(undefined)"
                [ngClass]="{
                  'bg-yellow-200': !categoryParams(),
                }"
              >
                全部
              </button>
              @for (category of categories; track category.id) {
                <button
                  class="w-full rounded-md px-4 py-0.5 text-start"
                  (click)="clearParams(); categoryParams.set(category.id)"
                  [ngClass]="{
                    'bg-yellow-200': category.id === categoryParams(),
                  }"
                >
                  {{ category.name }}
                </button>
              }
            }
          }
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-gray-600">價錢搜尋</p>
          <div class="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="最低價"
              min="0"
              class="rounded-md border py-1 text-center text-sm"
              [(ngModel)]="minPriceMicrosParams"
            />
            <input
              type="number"
              placeholder="最高價"
              min="0"
              class="rounded-md border py-1 text-center text-sm"
              [(ngModel)]="maxPriceMicrosParams"
            />
          </div>
          <!--          <div class="flex flex-col">-->
          <!--            <mat-checkbox>名稱大於5個字</mat-checkbox>-->
          <!--            <mat-checkbox>名稱小於5個字</mat-checkbox>-->
          <!--          </div>-->
        </div>
        <button
          (click)="clearAll()"
          class="rounded-md bg-gray-200 px-2 py-0.5 hover:bg-gray-400"
        >
          重置
        </button>
      </div>

      <div class="flex flex-col gap-4">
        @if (productsQuery.isPending()) {
          <div class="grid grid-cols-5 gap-4 overflow-y-auto">
            @for (skeleton of [].constructor(10); track skeleton) {
              <ngx-skeleton-loader
                count="1"
                [theme]="{
                  'border-radius': '5px',
                  height: '20rem',
                }"
              />
            }
          </div>
        } @else if (productsQuery.isError()) {
          error
        } @else {
          @if (productsQuery.data(); as data) {
            <div class="grid grid-cols-5 gap-4">
              @for (
                product of data.items
                  | paginate
                    : {
                        id: 'paginate',
                        itemsPerPage: data.pageSize,
                        currentPage: data.page,
                        totalItems: data.total,
                      };
                track product.id
              ) {
                <app-product-card [product]="product"></app-product-card>
              }
            </div>
            @if (data.items.length === 0) {
              <p class="text-gray-500">沒有產品</p>
            }
          }
        }

        <div class="mt-4 flex justify-end">
          <pagination-controls
            previousLabel="上一頁"
            nextLabel="下一頁"
            id="paginate"
            (pageChange)="pageChanged($event)"
            [autoHide]="true"
          ></pagination-controls>
        </div>
      </div>
    </div>
  `,
  styles: [],
  standalone: true,
  imports: [
    ProductCardComponent,
    NgClass,
    NgxPaginationModule,
    FormsModule,
    NgxSkeletonLoaderComponent,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  productsQueryService = inject(ProductsQueryService);
  categoriesQueryService = inject(ProductCategoryQueryService);
  #productParamsService = inject(ProductParamsService);

  categoryParams = this.#productParamsService.categoryParams;
  minPriceMicrosParams = this.#productParamsService.minPriceMicrosParams;
  maxPriceMicrosParams = this.#productParamsService.maxPriceMicrosParams;
  pageParams = this.#productParamsService.pageParams;
  pageSizeParams = this.#productParamsService.pageSizeParams;
  search = this.#productParamsService.search;

  searchInput = signal('');

  productsQuery = injectQuery(() =>
    this.productsQueryService.productsQuery({
      categoryId: this.categoryParams(),
      priceMin: this.minPriceMicrosParams() ?? undefined,
      priceMax: this.maxPriceMicrosParams() ?? undefined,
      page: this.pageParams(),
      pageSize: this.pageSizeParams(),
      title: this.search(),
    }),
  );

  categoriesQuery = injectQuery(() =>
    this.categoriesQueryService.categoriesQuery(),
  );

  pageChanged(page: number) {
    this.pageParams.set(page);
  }

  setSearchInput() {
    this.search.set(this.searchInput());
  }

  resetSearch() {
    this.searchInput.set('');
    this.search.set('');
  }

  clearParams() {
    this.minPriceMicrosParams.set(undefined);
    this.maxPriceMicrosParams.set(undefined);
    this.pageParams.set(1);
    this.pageSizeParams.set(20);
    this.search.set('');
  }

  clearAll() {
    this.clearParams();
    this.categoryParams.set(undefined);
    this.searchInput.set('');
  }
}
