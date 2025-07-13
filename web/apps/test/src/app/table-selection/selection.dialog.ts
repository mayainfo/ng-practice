import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Injectable,
} from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { NgxPaginationModule } from 'ngx-pagination';
import { firstValueFrom } from 'rxjs';

import { ProductsQueryService } from '../products/data-access/products.query';
import { Product } from '../products/data-access/products.service';
import { ErrorComponent } from '../shared/error.component';
import { LoadingComponent } from '../shared/loading.component';
import { injectSelectionModel } from '@app/common/signal/ui/selection-model';

export type SelectionDialogData = {
  products: Product[];
};

export type SelectionDialogResult = {
  products: Product[];
};

@Injectable({ providedIn: 'root' })
export class SelectionDialogService {
  readonly #dialog = inject(MatDialog);

  open(data: SelectionDialogData) {
    const dialogRef = this.#dialog.open<
      SelectionDialogComponent,
      SelectionDialogData,
      SelectionDialogResult
    >(SelectionDialogComponent, {
      data,
      width: '60%', // TODO: clamp(min, desired, max)
      height: '40rem', //TODO: remove this
    });
    return firstValueFrom(dialogRef.afterClosed());
  }
}

@Component({
  selector: 'app-selection-dialog',
  imports: [
    MatDialogModule,
    NgxPaginationModule,
    LoadingComponent,
    ErrorComponent,
    MatTableModule,
    MatCheckbox,
  ],
  template: `
    <h2 mat-dialog-title>選擇商品</h2>

    <mat-dialog-content>
      @if (productsQuery.isPending()) {
        <app-loading />
      } @else if (productsQuery.isError()) {
        <app-error [error]="productsQuery.error()" />
      } @else {
        @if (productsQuery.data(); as data) {
          <mat-table
            [dataSource]="
              data.items
                | paginate
                  : {
                      id: 'paginate',
                      itemsPerPage: data.pageSize,
                      currentPage: data.page,
                      totalItems: data.total,
                    }
            "
            #table="matTable"
          >
            <ng-container matColumnDef="checkbox">
              <mat-header-cell *matHeaderCellDef
                ><mat-checkbox
                  [checked]="isAllSelected()"
                  (change)="toggleAll()"
              /></mat-header-cell>
              <mat-cell *matCellDef="let element">
                <mat-checkbox
                  [checked]="selectedProducts.isSelected(element)()"
                  (change)="toggleProduct(element)"
                ></mat-checkbox>
              </mat-cell>
            </ng-container>

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
              <mat-cell *matCellDef="let element">{{
                element.category.name
              }}</mat-cell>
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
        }
      }
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <div class="flex gap-4">
        <button
          (click)="submit()"
          class="rounded-md border border-yellow-800 bg-yellow-200 px-4 py-0.5 hover:bg-yellow-400"
        >
          確認
        </button>
        <button
          class="rounded-md border border-gray-400 px-4 py-0.5"
          mat-dialog-close
        >
          取消
        </button>
      </div>
    </mat-dialog-actions>
  `,
  styles: `
    .mat-column-checkbox,
    .mat-column-price {
      flex-shrink: 0;
      flex-basis: 5rem;
      flex-grow: 0;
    }

    .mat-column-title,
    .mat-column-description {
      flex: 3;
    }
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SelectionDialogComponent {
  readonly #dialogRef = inject(
    MatDialogRef<SelectionDialogComponent, SelectionDialogResult>,
  );
  readonly data = inject<SelectionDialogData>(MAT_DIALOG_DATA);
  readonly productsQueryService = inject(ProductsQueryService);

  readonly productsQuery = injectQuery(() => this.productsQueryService.productsQuery());

  readonly displayedColumns = [
    'checkbox',
    'title',
    'category',
    'description',
    'price',
  ];

  readonly selectedProducts = injectSelectionModel(
    true, this.data.products, true, (a, b) => a.id === b.id,
  )

  readonly isAllSelected = computed(
    () => {
      const products = this.productsQuery.data()?.items ?? [];
      if (products.length === 0) {
        return false;
      }
      return products.every((product) => this.selectedProducts.isSelected(product)())
    }
  );

  submit() {
    this.#dialogRef.close({
      products: this.selectedProducts.selected(),
    });
  }

  toggleAll() {
    if (this.isAllSelected()) {
      this.selectedProducts.clear()
    } else {
      this.selectedProducts.select(
        ...(this.productsQuery.data()?.items ?? [])
      )
    }
  }

  toggleProduct(product: Product) {
    this.selectedProducts.toggle(product);
  }
}
