import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

import { Category } from './categories.service';

const baseUrl = 'https://api.escuelajs.co/api/v1/products';

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string;
  updatedAt: string;
}

export interface ProductCreateInput {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface ProductUpdateInput {
  title?: string;
  price?: number;
}

export interface ProductQueryParams {
  page?: number;
  pageSize?: number;
  title?: string;
  price?: number;
  priceMin?: number;
  priceMax?: number;
  categoryId?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http = inject(HttpClient);

  getProducts(params: ProductQueryParams = {}) {
    const url = new URL(baseUrl);
    const queryParams: Record<string, string | number> = {};
    if (params.title) {
      queryParams['title'] = params.title;
    }
    if (params.price) {
      queryParams['price'] = params.price;
    }
    if (params.priceMin) {
      queryParams['price_min'] = params.priceMin;
      if (!params.priceMax) {
        // If priceMin is set, we should also set priceMax to a high value
        queryParams['price_max'] = 999999; // Arbitrary high value
      }
    }
    if (params.priceMax) {
      queryParams['price_max'] = params.priceMax;
      if (!params.priceMin) {
        // If priceMax is set, we should also set priceMin to a low value
        queryParams['price_min'] = 0; // Arbitrary low value
      }
    }
    if (params.categoryId) {
      queryParams['categoryId'] = params.categoryId;
    }
    Object.keys(queryParams).forEach((key) => {
      url.searchParams.append(key, String(queryParams[key]));
    });

    return this.http.get<Product[]>(url.toString()).pipe(
      map((products) => {
        const page = params.page ?? 1;
        const pageSize = params.pageSize ?? 10;
        const total = products.length;

        const paginatedProducts = products.slice(
          (page - 1) * pageSize,
          page * pageSize,
        );

        return {
          items: paginatedProducts,
          total,
          page,
          pageSize,
        };
      }),
    );
  }

  getProduct(productId: number) {
    return this.http.get<Product>(`${baseUrl}/${productId}`);
  }

  createProduct(input: ProductCreateInput) {
    return this.http.post<Product>(baseUrl, input);
  }

  updateProduct(productId: number, input: ProductUpdateInput) {
    return this.http.put<Product>(`${baseUrl}/${productId}`, input);
  }

  deleteProduct(productId: number) {
    return this.http.delete<boolean>(`${baseUrl}/${productId}`);
  }
}
