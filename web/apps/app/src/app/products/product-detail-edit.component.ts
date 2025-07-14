import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  numberAttribute,
  untracked,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { injectInitialQuery } from '@app/common/signal/ui/query';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { NgxControlError } from 'ngxtension/control-error';

import { ProductCategoryQueryService } from './data-access/product-category.query';
import { ProductsQueryService } from './data-access/products.query';
import {
  Product,
  ProductCreateInput,
  ProductUpdateInput,
} from './data-access/products.service';
import { LoadingComponent } from '../shared/loading.component';
import { ErrorComponent } from '../shared/error.component';

@Component({
  selector: 'app-product-detail',
  template: `
    <form class="flex flex-col gap-4" [formGroup]="form" (submit)="submit()">
      <div class="flex items-center justify-between">
        <p class="text-lg">產品詳情</p>
      </div>
      <div class="flex w-full items-center gap-4">
        <mat-label>名稱</mat-label>
        <mat-form-field class="w-full">
          <input
            matInput
            type="text"
            placeholder="請輸入產品名稱"
            formControlName="title"
          />
          <mat-error *ngxControlError="form.controls.title; track: 'required'"
            >必填
          </mat-error>
        </mat-form-field>
      </div>
      <!--      <div class="flex items-center gap-4">-->
      <!--        <mat-label>簡介</mat-label>-->
      <!--        <mat-form-field class="w-full">-->
      <!--          <input-->
      <!--            matInput-->
      <!--            type="text"-->
      <!--            placeholder="請輸入產品名稱"-->
      <!--            formControlName="slug"-->
      <!--          />-->
      <!--          <mat-error *ngxControlError="form.controls.slug; track: 'required'"-->
      <!--            >必填-->
      <!--          </mat-error>-->
      <!--          <mat-error *ngxControlError="form.controls.slug; track: 'maxlength'"-->
      <!--            >字數不得超過50字-->
      <!--          </mat-error>-->
      <!--        </mat-form-field>-->
      <!--      </div>-->
      <div class="flex items-center gap-4">
        <mat-label>描述</mat-label>
        <mat-form-field class="w-full">
          <textarea
            matInput
            type="text"
            placeholder="描述"
            formControlName="description"
            rows="5"
          ></textarea>
          <mat-error
            *ngxControlError="form.controls.description; track: 'required'"
            >必填
          </mat-error>
        </mat-form-field>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex items-center gap-4">
          <mat-label>價格</mat-label>
          <mat-form-field class="w-full">
            <input
              matInput
              type="number"
              placeholder="請輸入價格"
              formControlName="price"
              min="0"
            />
            <mat-error *ngxControlError="form.controls.price; track: 'required'"
              >必填
            </mat-error>
          </mat-form-field>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex items-center gap-4">
          <mat-label>類別</mat-label>
          <mat-form-field class="w-full">
            <mat-select formControlName="category">
              @if (productCategoriesQuery.isPending()) {
                <app-loading />
              } @else if (productCategoriesQuery.isError()) {
                <app-error [error]="productCategoriesQuery.isError()" />
              } @else {
                @if (productCategoriesQuery.data(); as categories) {
                  @for (category of categories; track category.id) {
                    <mat-option [value]="category.id"
                      >{{ category.name }}
                    </mat-option>
                  }
                }
              }
            </mat-select>
          </mat-form-field>
        </div>
      </div>
      <div class="flex items-center justify-end gap-4">
        <button
          class="rounded-md border border-yellow-800 bg-yellow-200 px-4 py-0.5 hover:bg-yellow-400"
        >
          {{ isNew() ? '新增' : '更新' }}
        </button>
        <a
          routerLink=".."
          class="rounded-md border border-yellow-800 px-4 py-0.5 hover:bg-gray-200"
          >取消</a
        >
      </div>
    </form>
  `,
  styles: `
    mat-label {
      flex-shrink: 0;
    }
  `,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInput,
    RouterLink,
    NgxControlError,
    LoadingComponent,
    ErrorComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailEditComponent {
  #fb = inject(NonNullableFormBuilder);
  #productsQueryService = inject(ProductsQueryService);
  #productCategoriesQueryService = inject(ProductCategoryQueryService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);

  productQuery = injectInitialQuery(() =>
    this.#productsQueryService.productQueryById(this.existProductId()),
  );
  productCategoriesQuery = injectQuery(() =>
    this.#productCategoriesQueryService.categoriesQuery(),
  );
  createMutation = this.#productsQueryService.createMutation();
  updateMutation = this.#productsQueryService.updateMutation();

  productId = input.required<string>();
  isNew = computed(() => this.productId() === 'new');
  existProductId = computed(() => {
    return numberAttribute(this.productId());
  });

  form = this.#fb.group({
    title: this.#fb.control('', {
      validators: [Validators.required],
    }),
    slug: this.#fb.control('', {
      validators: [],
    }),
    description: this.#fb.control('', {
      validators: [Validators.required],
    }),
    price: this.#fb.control<number | null>(null, {
      validators: [Validators.required],
    }),
    category: this.#fb.control(0),
  });

  constructor() {
    effect(() => {
      const product = this.productQuery.data();
      if (!product) {
        return;
      }

      untracked(() => {
        this.#initForm(product);
      });
    });

    effect(() => {
      const isNew = this.isNew();
      untracked(() => {
        if (isNew) {
          this.form.controls.title.enable();
          this.form.controls.slug.enable();
          this.form.controls.description.enable();
          this.form.controls.price.enable();
          this.form.controls.category.enable();
        } else {
          this.form.controls.slug.disable();
          this.form.controls.description.disable();
          this.form.controls.category.disable();
        }
      });
    });
  }

  #initForm(product: Product) {
    this.form.setValue({
      title: product.title,
      slug: product.slug,
      description: product.description,
      price: product.price,
      category: product.category.id,
    });
  }

  submit() {
    this.#trim();
    if (!this.#validate()) {
      return;
    }
    if (this.isNew()) {
      this.#create();
    } else {
      this.#update();
    }
  }

  #trim() {
    const { title, slug, description } = this.form.getRawValue();
    this.form.patchValue({
      title: title.trim(),
      slug: slug.trim(),
      description: description.trim(),
    });
  }

  #validate() {
    return this.form.valid;
  }

  #create() {
    const { title, description, price, category, slug } =
      this.form.getRawValue();
    const input: ProductCreateInput = {
      title: title.trim(),
      // slug: slug.trim(),
      description: description.trim(),
      price: price ?? 0,
      categoryId: category,
      images: ['https://printler.com/en/poster/162394/'],
    };
    this.createMutation.mutate(input, {
      onSuccess: (id) => {
        this.#router.navigate(['../..', id], { relativeTo: this.#route });
      },
    });
  }

  #update() {
    const { title, description, price, category, slug } =
      this.form.getRawValue();
    const input: ProductUpdateInput = {
      title: title.trim(),
      // slug: slug.trim(),
      // description: description.trim(),
      price: price ?? 0,
      // categoryId: category,
      // images: ['https://printler.com/en/poster/162394/'],
    };
    this.updateMutation.mutate(
      {
        productId: this.existProductId(),
        body: input,
      },
      {
        onSuccess: () => {
          this.#router.navigate(['..'], { relativeTo: this.#route });
        },
      },
    );
  }
}
