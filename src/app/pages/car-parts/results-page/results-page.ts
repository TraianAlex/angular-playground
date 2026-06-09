import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CarPart } from '../../../models/car-part.model';
import { omitNullish } from '../utils/omit-nullish';
import { PartClassFilter } from '../utils/types';

type PartsSearchParams = {
  vin: string;
  oem: string;
  partClass: PartClassFilter | '';
};

@Component({
  selector: 'app-car-parts-results-page',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './results-page.html',
  styleUrl: './results-page.css',
})
export class CarPartsResultsPage {
  readonly vin = input('');
  readonly oem = input('');
  readonly partClass = input<PartClassFilter | ''>('');

  readonly partsResource = httpResource<CarPart[]>(() => {
    const params = omitNullish({
      vin: this.vin(),
      oem: this.oem(),
      partClass: this.partClass() === 'all' ? undefined : this.partClass(),
    }) as Record<string, string>;

    if (!this.oem()) {
      return undefined;
    }

    return {
      url: `${environment.apiUrl}/parts`,
      params,
    };
  });
}
