import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  template: `
    <div class="flex flex-col gap-4">
      <p class="text-lg font-bold">已選擇的商品</p>
      <!--      <mat-table-->
      <!--        [dataSource]="-->
      <!--          products.items-->
      <!--            | paginate-->
      <!--              : {-->
      <!--                  id: 'paginate',-->
      <!--                  itemsPerPage: products.pageSize,-->
      <!--                  currentPage: 1,-->
      <!--                  totalItems: products.total,-->
      <!--                }-->
      <!--        "-->
      <!--        #table="matTable"-->
      <!--      >-->
      <!--        <ng-container matColumnDef="image">-->
      <!--          <mat-header-cell *matHeaderCellDef>作品圖</mat-header-cell>-->
      <!--          <mat-cell *matCellDef="let element">-->
      <!--            <div class="py-4">-->
      <!--              <img-->
      <!--                [src]="element.images[0] | mediaUrl"-->
      <!--                class="aspect-square w-20 overflow-hidden rounded-md"-->
      <!--              />-->
      <!--            </div>-->
      <!--          </mat-cell>-->
      <!--        </ng-container>-->

      <!--        <ng-container matColumnDef="content">-->
      <!--          <mat-header-cell *matHeaderCellDef>品名/內容</mat-header-cell>-->
      <!--          <mat-cell *matCellDef="let element">-->
      <!--            <div class="flex flex-col">-->
      <!--              <p class="line-clamp-1">{{ element.name }}</p>-->
      <!--              <p class="line-clamp-2 text-gray-500">-->
      <!--                {{ element.description }}-->
      <!--              </p>-->
      <!--            </div>-->
      <!--          </mat-cell>-->
      <!--        </ng-container>-->

      <!--        <ng-container matColumnDef="category">-->
      <!--          <mat-header-cell *matHeaderCellDef>分類</mat-header-cell>-->
      <!--          <mat-cell *matCellDef="let element">{{-->
      <!--            element.category.name-->
      <!--          }}</mat-cell>-->
      <!--        </ng-container>-->

      <!--        <ng-container matColumnDef="stock">-->
      <!--          <mat-header-cell *matHeaderCellDef>購買上限</mat-header-cell>-->
      <!--          <mat-cell *matCellDef="let element">{{-->
      <!--            element.maxOrderQuantity-->
      <!--          }}</mat-cell>-->
      <!--        </ng-container>-->

      <!--        <ng-container matColumnDef="status">-->
      <!--          <mat-header-cell *matHeaderCellDef>狀態</mat-header-cell>-->
      <!--          <mat-cell *matCellDef="let element">{{ element.status }}</mat-cell>-->
      <!--        </ng-container>-->

      <!--        <ng-container matColumnDef="actions">-->
      <!--          <mat-header-cell *matHeaderCellDef>操作</mat-header-cell>-->
      <!--          <mat-cell *matCellDef="let element">-->
      <!--            <div class="flex items-center gap-4">-->
      <!--              <a [routerLink]="element.id" class="aspect-square w-5"> 編輯 </a>-->
      <!--              <button class="aspect-square w-5">-->
      <!--                <svg-icon src="assets/delete.svg"></svg-icon>-->
      <!--              </button>-->
      <!--            </div>-->
      <!--          </mat-cell>-->
      <!--        </ng-container>-->

      <!--        <mat-header-row-->
      <!--          *matHeaderRowDef="displayedColumns"-->
      <!--          class="!bg-secondary !text-white"-->
      <!--        ></mat-header-row>-->
      <!--        <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>-->
      <!--      </mat-table>-->
    </div>
  `,
  styles: [],
  standalone: true,
  imports: [MatTableModule],
})
export class TableComponent {
  displayedColumns: string[] = [
    'image',
    'content',
    'category',
    'stock',
    'status',
    'actions',
  ];
}
