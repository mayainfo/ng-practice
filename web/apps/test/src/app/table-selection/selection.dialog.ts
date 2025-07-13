import {
  Component,
  computed,
  inject,
  Injectable,
  model,
  signal,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { Product } from '../products/data-access/products.service';
import { ProductsQueryService } from '../products/data-access/products.query';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { ProductCardComponent } from '../products/product-card.component';
import { LoadingComponent } from '../shared/loading.component';
import { ErrorComponent } from '../shared/error.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckbox } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

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
      width: '60%',
      height: '40rem',
    });
    return firstValueFrom(dialogRef.afterClosed());
  }
}

@Component({
  selector: 'app-selection-dialog',
  imports: [
    MatDialogModule,
    NgxPaginationModule,
    NgxSkeletonLoaderComponent,
    ProductCardComponent,
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
        <app-error [error]="productsQuery.isError()" />
      } @else {
        @if (productsQuery.data(); as data) {
          <mat-table
            [dataSource]="
              data.items
                | paginate
                  : {
                      id: 'paginate',
                      itemsPerPage: data.pageSize,
                      currentPage: 1,
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
                  [checked]="selectedProducts().isSelected(element)"
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
})
export class SelectionDialogComponent {
  readonly #dialogRef = inject(
    MatDialogRef<SelectionDialogComponent, SelectionDialogResult>,
  );
  readonly data = inject<SelectionDialogData>(MAT_DIALOG_DATA);
  productsQueryService = inject(ProductsQueryService);

  productsQuery = injectQuery(() => this.productsQueryService.productsQuery());

  displayedColumns: string[] = [
    'checkbox',
    'title',
    'category',
    'description',
    'price',
  ];

  checked = model.required<boolean>();

  readonly selectedProducts = signal(
    new SelectionModel(true, this.data.products, true, (a, b) => a.id === b.id),
    {
      equal: () => false,
    },
  );
  readonly isAllSelected = computed(
    () =>
      this.productsQuery
        .data()
        ?.items.every((product) =>
          this.selectedProducts().isSelected(product),
        ) || false,
  );

  submit() {
    this.#dialogRef.close({
      products: this.selectedProducts().selected,
    });
  }

  toggleAll() {
    if (this.isAllSelected()) {
      this.selectedProducts.update((selectionModel) => {
        selectionModel.clear();
        return selectionModel;
      });
    } else {
      this.selectedProducts.update((selectionModel) => {
        this.productsQuery.data()?.items.forEach((product) => {
          selectionModel.select(product);
        });
        return selectionModel;
      });
    }
  }

  toggleProduct(product: Product) {
    this.selectedProducts.update((selectionModel) => {
      if (selectionModel.isSelected(product)) {
        selectionModel.deselect(product);
      } else {
        selectionModel.select(product);
      }
      return selectionModel;
    });
  }
}
