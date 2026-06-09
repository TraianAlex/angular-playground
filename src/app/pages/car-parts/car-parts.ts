import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CarPartClass } from '../../models/car-part.model';

export type PartClassFilter = 'all' | CarPartClass;

export interface PartClassOption {
  value: PartClassFilter;
  label: string;
  icon: 'check' | 'gear' | 'thumbs-up' | 'piggy-bank';
}

@Component({
  selector: 'app-car-parts',
  templateUrl: './car-parts.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './car-parts.css',
})
export class CarParts {
  protected readonly vin = signal('');
  protected readonly oemPartNumber = signal('');
  protected readonly partClass = signal<PartClassFilter>('all');

  protected readonly partClassOptions: PartClassOption[] = [
    { value: 'all', label: 'All', icon: 'check' },
    { value: 'oem', label: 'OEM', icon: 'gear' },
    { value: 'quality-alternative', label: 'Quality alternatives', icon: 'thumbs-up' },
    { value: 'budget-alternative', label: 'Budget alternatives', icon: 'piggy-bank' },
  ];

  protected selectPartClass(value: PartClassFilter): void {
    this.partClass.set(value);
  }

  protected onVinInput(event: Event): void {
    this.vin.set((event.target as HTMLInputElement).value);
  }

  protected onOemPartNumberInput(event: Event): void {
    this.oemPartNumber.set((event.target as HTMLInputElement).value);
  }

  protected configure(): void {
    // Validation and API logic will be added later.
  }
}
