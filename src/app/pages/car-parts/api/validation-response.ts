import { debounce, SchemaPath, validateHttp } from '@angular/forms/signals';
import type { CarPartStatus } from '../../../models/car-part.model';
import { environment } from '../../../../environments/environment';
import { getHttpStatus } from '../utils/http-status';

export interface CartPartAvailabilityValidationResponse {
  oem: string;
  status: CarPartStatus;
}

export function validateHttpCartpartAvailability(path: SchemaPath<string>): void {
  debounce(path, 300);
  validateHttp(path, {
    request: ({ value }) =>
      `${environment.apiUrl}/parts/validate?oem=${encodeURIComponent(value())}`,
    onSuccess: (result: CartPartAvailabilityValidationResponse) => {
      if (result.status === 'available') return null;
      return {
        kind: 'partUnavailable',
        message: 'Part is not available',
      };
    },
    onError: (error: unknown) => {
      switch (getHttpStatus(error)) {
        case 404:
          return {
            kind: 'oemNotFound',
            message: 'OEM number not found',
          };
        default:
          return { kind: 'lookupError', message: 'Failed to validate OEM number' };
      }
    },
  });
}
