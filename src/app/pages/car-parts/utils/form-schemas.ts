import { pattern, schema, validate } from '@angular/forms/signals';
import { validateHttpCartpartAvailability } from '../api/validation-response';
import { exactLength } from './validators';

const OEM_REGEX = /^\d{5}-[A-Z0-9]{5}$/;
const VIN_REGEX = /^[A-HJ-NPR-Z0-9]{17}$/;

export const vinNumberSchema = schema<string>((path) => {
  exactLength(path, 17, { message: 'VIN must be exactly 17 characters' });
  validate(path, ({ value }) => {
    if (!VIN_REGEX.test(value().toUpperCase())) {
      return {
        kind: 'pattern',
        message: 'VIN must be 17 characters with no letters I, O, or Q',
      };
    }
    return null;
  });
});

export const oemNumberSchema = schema<string>((path) => {
  pattern(path, OEM_REGEX, { message: 'OEM format: XXXXX-XXXXX (e.g. 12345-ABCDE)' });
  validateHttpCartpartAvailability(path);
});
