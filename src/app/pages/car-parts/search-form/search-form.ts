import { Component, inject, injectAsync, onIdle, signal } from '@angular/core';
import { apply, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CarPartsNavigation } from '../car-parts-navigation';
import { PartClassSelector } from '../part-class-selector/part-class-selector';
import { BASE_SNACK_BAR_CONFIG } from '../utils/constants';
import { oemNumberSchema, vinNumberSchema } from '../utils/form-schemas';
import { CarPartsSearchModel } from '../utils/types';

@Component({
  selector: 'app-search-form',
  imports: [FormField, FormRoot, MatButton, MatIcon, MatProgressSpinner, PartClassSelector],
  templateUrl: './search-form.html',
  styleUrl: './search-form.css',
})
export class SearchForm {
  readonly #carPartsNavigation = inject(CarPartsNavigation);
  readonly #snackBar = injectAsync(
    () => import('@angular/material/snack-bar').then((m) => m.MatSnackBar),
    { prefetch: onIdle },
  );

  // readonly #fb = inject(NonNullableFormBuilder);

  // readonly form = this.#fb.group({
  //   vin: ['', [Validators.required, exactLength(17)]],
  //   oem: ['', [Validators.required]],
  //   partClass: [''],
  // });

  readonly model = signal<CarPartsSearchModel>({
    vin: '',
    oem: '',
    partClass: 'all',
  });

  readonly searchForm = form(
    this.model,
    (s) => {
      required(s.vin, { message: 'VIN number is required' });
      required(s.oem, { message: 'OEM number is required' });
      // inline validation
      // validate(s.vin, ({ value }) => {
      //   if (value().trim().length === 0)
      //     return { kind: 'custom ', message: 'VIN number is required' };
      //   return null;
      // });
      // ang 22 validators
      // exactLength(s.vin, 17, { message: 'VIN number must be 17 characters' });
      // api validation
      apply(s.vin, vinNumberSchema);
      apply(s.oem, oemNumberSchema);
    },
    {
      submission: {
        action: async () => {
          await this.#carPartsNavigation.navigateToResultsPage(this.model());
        },
        onInvalid: async () => {
          await this.#openFixFormErrorsSnackBar();
        },
      },
    },
  );

  async #openFixFormErrorsSnackBar(): Promise<void> {
    (await this.#snackBar()).open(
      'Please fix the form errors before submitting',
      'Dismiss',
      BASE_SNACK_BAR_CONFIG,
    );
  }
}
