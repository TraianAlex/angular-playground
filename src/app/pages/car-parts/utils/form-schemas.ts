import { pattern, schema } from '@angular/forms/signals';
import { validateHttpCartpartAvailability } from '../api/validation-response';

const OEM_REGEX = /^\d{5}-[A-Z0-9]{5}$/;

export const oemNumberSchema = schema<string>((path) => {
  pattern(path, OEM_REGEX, { message: 'OEM format: XXXXX-XXXXX (e.g. 12345-ABCDE)' });
  validateHttpCartpartAvailability(path);
});
