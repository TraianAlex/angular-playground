import { Component, signal, viewChild } from '@angular/core';
import { SearchForm } from './search-form/search-form';

type SampleField = 'vin' | 'oem';

interface SampleValue {
  field: SampleField;
  label: string;
  value: string;
}

@Component({
  selector: 'app-car-parts',
  imports: [SearchForm],
  templateUrl: './car-parts.html',
  styleUrl: './car-parts.css',
})
export class CarParts {
  protected readonly searchFormCmp = viewChild.required(SearchForm);

  protected readonly samples: SampleValue[] = [
    { field: 'vin', label: 'VIN', value: 'JT3HP10VTX7063958' },
    { field: 'oem', label: 'OEM', value: '12345-ABCDE' },
  ];

  protected readonly copiedField = signal<SampleField | null>(null);

  async copySample(field: SampleField, value: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(value);
      this.copiedField.set(field);
      setTimeout(() => {
        if (this.copiedField() === field) {
          this.copiedField.set(null);
        }
      }, 2000);
    } catch {
      this.copiedField.set(null);
    }
  }
}
