import { inject, Injectable } from '@angular/core';
import { queryOptions } from '@tanstack/angular-query-experimental';
import { firstValueFrom } from 'rxjs';

import { CategoriesService } from './categories.service';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryQueryService {
  #categoryService = inject(CategoriesService);

  categoriesQuery = () =>
    queryOptions({
      queryKey: ['categories', 'list'],
      queryFn: () => firstValueFrom(this.#categoryService.getCategories()),
    });
}
