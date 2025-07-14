import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Product } from './data-access/products.service';

@Component({
  selector: 'app-product-card',
  template: `
    <a
      [routerLink]="product().id.toString()"
      class="flex h-full flex-col gap-2 overflow-hidden rounded-md border border-yellow-900 transition-all duration-200 hover:bg-yellow-50"
    >
      <img
        class="aspect-square w-full bg-yellow-50"
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
  imports: [CurrencyPipe, RouterLink, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
}
