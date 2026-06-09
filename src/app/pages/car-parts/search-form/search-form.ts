import {
  Component,
  inject,
  signal,
  ChangeDetectionStrategy,
  injectAsync,
  onIdle,
} from '@angular/core';
import { apply, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { oemNumberSchema } from '../utils/form-schemas';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BASE_SNACK_BAR_CONFIG } from '../utils/constants';
import { CarPartsNavigation } from '../car-parts-navigation';

@Component({
  selector: 'app-search-form',
  imports: [
    FormField,
    FormRoot,
    MatFormField,
    MatHint,
    MatLabel,
    MatButton,
    MatProgressSpinner,
    MatError,
    MatIcon,
  ],
  templateUrl: './search-form.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
  readonly model = signal({
    vin: '',
    oem: '',
    partClass: 'all',
  });

  readonly searchForm = form(
    this.model,
    (s) => {
      required(s.vin, { message: 'VIN number is required' });
      // inline validation
      // validate(s.vin, ({ value }) => {
      //   if (value().trim().length === 0)
      //     return { kind: 'custom ', message: 'VIN number is required' };
      //   return null;
      // });
      // ang 22 validators
      // exactLength(s.vin, 17, { message: 'VIN number must be 17 characters' });
      // api validation
      apply(s.vin, oemNumberSchema);
      required(s.oem, { message: 'OEM number is required' });
    },
    {
      submission: {
        action: async () => {
          console.log('Search payload:', this.model());
          this.#carPartsNavigation.navigateToResultsPage(this.model());
        },
        onInvalid: async () => {
          await this.#openFixFormErrorsSnackBar();
        },
      },
    },
  );

  async #openFixFormErrorsSnackBar() {
    (await this.#snackBar()).open(
      'Please fix the form errors before submitting',
      'Dismiss',
      BASE_SNACK_BAR_CONFIG,
    );
  }
}
