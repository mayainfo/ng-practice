import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { SvgIconComponent } from 'angular-svg-icon';

import { ButtonComponent } from './button.component';

@Component({
  selector: 'app-delete',
  imports: [
    CommonModule,
    SvgIconComponent,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    ButtonComponent,
    MatDialogClose,
  ],
  template: `
    <h2 mat-dialog-title class="text-center">確認刪除</h2>
    <mat-dialog-content>
      <div class="flex flex-col items-center gap-4">
        <p class="text-primary text-center">確定要刪除此物件嗎？</p>
        <svg-icon src="assets/delete.svg" class="aspect-square w-36"></svg-icon>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="center">
      <div class="flex gap-4">
        <button app-button color="primary" mat-dialog-close>取消</button>
        <button app-button color="delete" (click)="closeDialog(true)">
          刪除
        </button>
      </div>
    </mat-dialog-actions>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteComponent {
  dialogRef = inject(MatDialogRef);

  isConfirmed = signal(false);

  closeDialog(confirmed = false) {
    this.isConfirmed.set(true);
    this.dialogRef.close(confirmed);
  }
}
