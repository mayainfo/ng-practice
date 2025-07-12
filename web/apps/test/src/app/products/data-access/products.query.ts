import { inject, Injectable } from '@angular/core';
import {
  keepPreviousData,
  QueryClient,
  queryOptions,
} from '@tanstack/angular-query-experimental';
import { ProductsService } from './products.service';
import { firstValueFrom } from 'rxjs';

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

  productsQuery = (params: Params) =>
    queryOptions({
      queryKey: ['products', 'list', params],
      queryFn: () =>
        firstValueFrom(
          this.#productService.getProducts({
            categoryId: params.categoryId,
            pageSize: params.pageSize,
            page: params.page,
            priceMin: params.priceMin,
            priceMax: params.priceMax,
            title: params.title,
          }),
        ),
      placeholderData: keepPreviousData,
    });

  productQueryById = (productId: number) =>
    queryOptions({
      queryKey: ['products', 'detail', productId],
      queryFn: () => firstValueFrom(this.#productService.getProduct(productId)),
    });

  // createMutation = () =>
  //   injectMutation(() => ({
  //     mutationFn: (params: ProductCreateInput) =>
  //       firstValueFrom(
  //         this.#productService.createProduct({
  //           body: params,
  //         }),
  //       ),
  //     onMutate: () => {
  //       this.#loadingService.show();
  //     },
  //     onSuccess: async () => {
  //       await this.#qc.invalidateQueries({
  //         queryKey: ['products'],
  //       });
  //       toast.success('產品新增成功');
  //     },
  //     onError: (error) => {
  //       toast.error(handleErrorMessage(error));
  //     },
  //     onSettled: () => {
  //       this.#loadingService.hide();
  //     },
  //   }));
  //
  // updateMutation = () =>
  //   injectMutation(() => ({
  //     mutationFn: ({
  //       productId,
  //       body,
  //     }: {
  //       productId: number;
  //       body: ProductUpdateInput;
  //     }) =>
  //       firstValueFrom(this.#productService.updateProduct({ productId, body })),
  //     onMutate: () => {
  //       this.#loadingService.show();
  //     },
  //     onSuccess: async () => {
  //       await this.#qc.invalidateQueries({
  //         queryKey: ['products'],
  //       });
  //       toast.success('產品更新成功');
  //     },
  //     onError: (error) => {
  //       toast.error(handleErrorMessage(error));
  //     },
  //     onSettled: () => {
  //       this.#loadingService.hide();
  //     },
  //   }));
  //
  // deleteMutation = () =>
  //   injectMutation(() => ({
  //     mutationFn: (productId: number) =>
  //       firstValueFrom(this.#productService.deleteProduct({ productId })),
  //     onMutate: () => {
  //       this.#loadingService.show();
  //     },
  //     onSuccess: async () => {
  //       await this.#qc.invalidateQueries({
  //         queryKey: ['products'],
  //       });
  //       toast.success('產品刪除成功');
  //     },
  //     onError: (error) => {
  //       toast.error(handleErrorMessage(error));
  //     },
  //     onSettled: () => {
  //       this.#loadingService.hide();
  //     },
  //   }));
}
