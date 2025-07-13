import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { CurrencyPipe, JsonPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Product } from './data-access/products.service';

@Component({
  selector: 'app-product-card',
  template: `
    <a
      [routerLink]="product().id.toString()"
      class="flex h-full flex-col gap-2 overflow-hidden rounded-md border border-yellow-900"
    >
      <img
        class="aspect-[4/3] w-full bg-yellow-50"
        [src]="product().images[0]"
        alt=""
      />
      <div class="h-full p-2">
        <div
          class="w-fit rounded-full border border-yellow-800 px-2 py-0.5 text-xs"
        >
          {{ product().category.name }}
        </div>
        <p class="line-clamp-1 font-bold">{{ product().title }}</p>
        <p class="line-clamp-1">{{ product().slug }}</p>
        <p class="line-clamp-2 text-sm text-gray-500">
          {{ product().description }}
        </p>

        <p class="text-red-500">{{ product().price | currency }}</p>
      </div>
    </a>
  `,
  styles: [],
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink,
    MatCheckbox,
    NgClass,
    FormsModule,
    JsonPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  product = input.required<Product>();
}
