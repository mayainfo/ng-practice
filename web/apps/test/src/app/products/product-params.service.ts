import { Injectable, numberAttribute } from '@angular/core';
import { linkedQueryParam } from 'ngxtension/linked-query-param';

@Injectable({
  providedIn: 'root',
})
export class ProductParamsService {
  minPriceMicrosParams = linkedQueryParam<number | undefined>('minPrice', {
    parse: (value) => numberAttribute(value, undefined),
    stringify: (value) => (value ? value.toString() : undefined),
  });

  maxPriceMicrosParams = linkedQueryParam<number | undefined>('maxPrice', {
    parse: (value) => numberAttribute(value, undefined),
    stringify: (value) => (value ? value.toString() : undefined),
  });

  categoryParams = linkedQueryParam<number | undefined>('category', {
    parse: (value) => numberAttribute(value, undefined),
    stringify: (value) => (value ? value.toString() : undefined),
  });

  pageParams = linkedQueryParam('page', {
    parse: (value) => numberAttribute(value, 1),
    stringify: (value) => value.toString(),
  });

  pageSizeParams = linkedQueryParam('pageSize', {
    parse: (value) => numberAttribute(value, 20),
    stringify: (value) => value.toString(),
  });

  search = linkedQueryParam<string>('search', {
    parse: (value) => {
      return value ?? '';
    },
    stringify: (value) => value,
    queryParamsHandling: 'merge',
  });
}
