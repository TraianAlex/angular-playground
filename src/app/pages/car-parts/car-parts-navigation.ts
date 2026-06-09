import { inject, Service } from '@angular/core';
import { Router } from '@angular/router';
import { omitNullish } from './utils/omit-nullish';
import { CarPartsSearchModel } from './utils/types';

@Service()
export class CarPartsNavigation {
  readonly #router = inject(Router);

  navigateToResultsPage(params: CarPartsSearchModel): Promise<boolean> {
    return this.#router
      .navigate(['/examples/car-parts/results'], {
        queryParams: omitNullish({
          vin: params.vin,
          oem: params.oem,
          partClass: params.partClass === 'all' ? undefined : params.partClass,
        }),
      })
      .then((success) => {
        if (!success) console.warn('Failed to navigate to results page');
        return success;
      });
  }
}
