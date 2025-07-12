import { inject, Injectable } from '@angular/core';
import {
  injectMutation,
  QueryClient,
  queryOptions,
} from '@tanstack/angular-query-experimental';
import { firstValueFrom } from 'rxjs';
import { toast } from 'ngx-sonner';
import { ProductsService } from './products.service';
import { CategoriesService } from './categories.service';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryQueryService {
  #categoryService = inject(CategoriesService);
  #qc = inject(QueryClient);

  categoriesQuery = () =>
    queryOptions({
      queryKey: ['categories', 'list'],
      queryFn: () => firstValueFrom(this.#categoryService.getCategories()),
    });

  // productQueryById = (productId: number) =>
  //   queryOptions({
  //     queryKey: ['categories', 'detail', productId],
  //     queryFn: () => this.#productService.getProduct({ productId }),
  //   });

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
