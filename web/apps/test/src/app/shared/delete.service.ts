import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { DeleteComponent } from './delete.component';

@Injectable({
  providedIn: 'root',
})
export class DeleteService {
  #dialog = inject(MatDialog);

  show(callback: () => void) {
    const dialogRef = this.#dialog.open(DeleteComponent, {
      width: '20rem',
      height: '20rem',
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((confirmed) => {
        if (confirmed) {
          callback();
        }
      });
  }
}
