import { inject, Injectable } from '@angular/core';
import {
  injectMutation,
  keepPreviousData,
  QueryClient,
  queryOptions,
} from '@tanstack/angular-query-experimental';
import { toast } from 'ngx-sonner';
import { firstValueFrom } from 'rxjs';

import { handleErrorMessage } from '../../shared/error-handling';
import { LoadingService } from '../../shared/loading.service';
import {
  ProductCreateInput,
  ProductsService,
  ProductUpdateInput,
} from './products.service';

export interface Params {
  categoryId?: number;
  pageSize?: number;
  page?: number;
  priceMin?: number;
  priceMax?: number;
  title?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsQueryService {
  #productService = inject(ProductsService);
  #qc = inject(QueryClient);
  #loadingService = inject(LoadingService);

  productsQuery = (params?: Params) =>
    queryOptions({
      queryKey: ['products', 'list', params],
      queryFn: () =>
        firstValueFrom(
          this.#productService.getProducts({
            page: params?.page,
            pageSize: params?.pageSize,
            categoryId: params?.categoryId,
            priceMin: params?.priceMin,
            priceMax: params?.priceMax,
            title: params?.title,
          }),
        ),
      placeholderData: keepPreviousData,
    });

  productQueryById = (productId: number) =>
    queryOptions({
      queryKey: ['products', 'detail', productId],
      queryFn: () => firstValueFrom(this.#productService.getProduct(productId)),
    });

  createMutation = () =>
    injectMutation(() => ({
      mutationFn: (params: ProductCreateInput) =>
        firstValueFrom(this.#productService.createProduct(params)),
      onMutate: () => {
        this.#loadingService.show();
      },
      onSuccess: async () => {
        await this.#qc.invalidateQueries({
          queryKey: ['products'],
        });
        toast.success('產品新增成功');
      },
      onError: (error) => {
        toast.error(handleErrorMessage(error));
      },
      onSettled: () => {
        this.#loadingService.hide();
      },
    }));

  updateMutation = () =>
    injectMutation(() => ({
      mutationFn: ({
        productId,
        body,
      }: {
        productId: number;
        body: ProductUpdateInput;
      }) => firstValueFrom(this.#productService.updateProduct(productId, body)),
      onMutate: () => {
        this.#loadingService.show();
      },
      onSuccess: async () => {
        await this.#qc.invalidateQueries({
          queryKey: ['products'],
        });
        toast.success('產品更新成功');
      },
      onError: (error) => {
        toast.error(handleErrorMessage(error));
      },
      onSettled: () => {
        this.#loadingService.hide();
      },
    }));

  deleteMutation = () =>
    injectMutation(() => ({
      mutationFn: (productId: number) =>
        firstValueFrom(this.#productService.deleteProduct(productId)),
      onMutate: () => {
        this.#loadingService.show();
      },
      onSuccess: async () => {
        await this.#qc.invalidateQueries({
          queryKey: ['products'],
        });
        toast.success('產品刪除成功');
      },
      onError: (error) => {
        toast.error(handleErrorMessage(error));
      },
      onSettled: () => {
        this.#loadingService.hide();
      },
    }));
}
