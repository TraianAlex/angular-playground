import { httpResource } from '@angular/common/http';
import { Component, input } from '@angular/core';
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

  /*
readonly partsResource = resource({
    params: () => ({
      vin: this.vin(),
      oem: this.oem(),
      partClass: this.partClass(),
    }),
    loader: async ({ params, abortSignal }): Promise<CarPart[]> => {
      const urlParams = new URLSearchParams(omitNullish(params) as Record<string, string>);
      const response = await fetch(`${environment.apiUrl}/parts?${urlParams.toString()}`, {
        signal: abortSignal,
      });
      if (!response.ok) {
        throw new Error('Failed to fetch parts');
      }
      return response.json();
    },
  });

  // with RxJS
  readonly #httpClient = inject(HttpClient);
  readonly partsResource2 = rxResource<CarPart[], PartsSearchParams>({
    params: (): PartsSearchParams => ({
      vin: this.vin(),
      oem: this.oem(),
      partClass: this.partClass(),
    }),
    stream: ({ params }) => {
      return this.#httpClient.get<CarPart[]>(`${environment.apiUrl}/parts`, {
        params: omitNullish(params) as Record<string, string>,
      });
    },
  });

  // angular 22 resource
  readonly partsResource3 = httpResource<CarPart[]>(() => {
    return {
      url: `${environment.apiUrl}/parts`,
      params: omitNullish({
        vin: this.vin(),
        oem: this.oem(),
        partClass: this.partClass(),
      }) as Record<string, string>,
    };
  });

  text = httpResource.text(() => {
    return 'Hello, world!';
  });
  blob = httpResource.blob(() => {
    return {
      url: 'data:text/plain;base64,SGVsbG8sIHdvcmxk!',
      headers: { 'Content-Type': 'text/plain' },
    };
  });
  arrayBuffer = httpResource.arrayBuffer(() => {
    return {
      url: 'data:application/octet-stream;base64,SGVsbG8sIHdvcmxk!',
      headers: { 'Content-Type': 'application/octet-stream' },
    };
  });
  */
}
