import { Injectable, Service, inject } from '@angular/core';
import { Router } from '@angular/router';
import { omitNullish } from './utils/omit-nullish';

export interface CarPartsResultsParams {
  vin: string;
  oem: string;
  partClass: string;
}

@Service()
export class CarPartsNavigation {
  readonly #router = inject(Router);

  navigateToResultsPage(params: CarPartsResultsParams): Promise<boolean> {
    return this.#router
      .navigate(['/examples/car-parts/results'], {
        queryParams: omitNullish({
          vin: params.vin,
          oem: params.oem,
          partClass: params.partClass,
        }),
      })
      .then((success) => {
        if (!success) console.warn('Failed to navigate to results page');
        return success;
      });
  }
}
