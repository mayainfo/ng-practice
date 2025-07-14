import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom, take } from 'rxjs';

import { DeleteComponent } from './delete.component';

@Injectable({
  providedIn: 'root',
})
export class DeleteService {
  #dialog = inject(MatDialog);

  async show() {
    const dialogRef = this.#dialog.open<DeleteComponent, undefined, boolean>(
      DeleteComponent,
      {
        width: '20rem',
        height: '20rem',
        disableClose: true,
      },
    );

    const confirmed = await firstValueFrom(dialogRef.afterClosed());
    return !!confirmed;
  }
}
