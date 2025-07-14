import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { Product } from '../products/data-access/products.service';
import { SelectionDialogService } from './selection.dialog';

@Component({
  selector: 'app-table',
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <p class="text-lg font-bold">已選擇的商品</p>
        <button
          (click)="chooseProduct()"
          class="rounded-md border border-yellow-800 px-4 py-0.5 hover:bg-yellow-200"
        >
          選擇商品
        </button>
      </div>
      @if (products().length !== 0) {
        <div class="rounded-md border border-yellow-800 p-4">
          <mat-table [dataSource]="products()" #table="matTable">
            <ng-container matColumnDef="title">
              <mat-header-cell *matHeaderCellDef>產品名稱</mat-header-cell>
              <mat-cell *matCellDef="let element">
                <div class="flex flex-col">
                  <p class="line-clamp-1">{{ element.title }}</p>
                </div>
              </mat-cell>
            </ng-container>

            <ng-container matColumnDef="category">
              <mat-header-cell *matHeaderCellDef>分類</mat-header-cell>
              <mat-cell *matCellDef="let element"
                >{{ element.category.name }}
              </mat-cell>
            </ng-container>

            <ng-container matColumnDef="description">
              <mat-header-cell *matHeaderCellDef>產品說明</mat-header-cell>
              <mat-cell *matCellDef="let element">
                <div class="flex flex-col">
                  <p class="line-clamp-1">{{ element.description }}</p>
                </div>
              </mat-cell>
            </ng-container>

            <ng-container matColumnDef="price">
              <mat-header-cell *matHeaderCellDef>價格</mat-header-cell>
              <mat-cell *matCellDef="let element">{{ element.price }}</mat-cell>
            </ng-container>

            <mat-header-row
              *matHeaderRowDef="displayedColumns"
            ></mat-header-row>
            <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
          </mat-table>
        </div>
        <div class="flex items-center justify-end">
          <button
            (click)="submit()"
            class="rounded-md border border-yellow-800 bg-yellow-200 px-4 py-0.5 hover:bg-yellow-400"
          >
            送出
          </button>
        </div>
      } @else {
        <p class="text-gray-500">尚未選擇商品</p>
      }
    </div>
  `,
  styles: `
    .mat-column-checkbox,
    .mat-column-price {
      flex-shrink: 0;
      flex-basis: 5rem;
      flex-grow: 0;
    }

    .mat-column-title {
      flex: 1;
    }
    .mat-column-category {
      flex: 0.5;
    }
    .mat-column-description {
      flex: 2;
    }
  `,
  standalone: true,
  imports: [MatTableModule], //TODO: typed table
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  readonly #selectionDialogService = inject(SelectionDialogService);

  readonly displayedColumns = ['title', 'category', 'description', 'price'];

  readonly products = signal<Product[]>([]);

  async chooseProduct() {
    const result = await this.#selectionDialogService.open({
      products: this.products(),
    });
    if (result) {
      // get data from dialog and store the data in this component
      this.products.set([...result.products]);
    }
  }

  submit() {
    alert(JSON.stringify([...this.products()]));
  }
}
