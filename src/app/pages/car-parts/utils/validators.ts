import { ValidationErrors, ValidatorFn } from '@angular/forms';
import { SchemaPath, validate } from '@angular/forms/signals';

// export function exactLength(length: number): ValidatorFn {
//   return (control: ValidationErrors | null) => {
//     const value = control?.['value'];
//     return value?.length !== length ? { exactLength: true } : null;
//   };
// }

export function exactLength(
  path: SchemaPath<string>,
  length: number,
  options?: { message: string },
): void {
  validate(path, ({ value }) => {
    if (value().length !== length)
      return {
        kind: 'exactLength',
        message: options?.message ?? `Value must be exactly ${length} characters`,
      };
    return null;
  });
}
