import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const baseUrl = 'https://api.escuelajs.co/api/v1/categories';

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  http = inject(HttpClient);

  getCategories() {
    return this.http.get<Category[]>(baseUrl);
  }
}
