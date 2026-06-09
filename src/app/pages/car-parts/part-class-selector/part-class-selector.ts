import { Component, ChangeDetectionStrategy, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { PartClassFilter } from '../utils/types';

export interface PartClassOption {
  value: PartClassFilter;
  label: string;
  icon: 'check' | 'gear' | 'thumbs-up' | 'piggy-bank';
}

@Component({
  selector: 'app-part-class-selector',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './part-class-selector.html',
  styleUrl: './part-class-selector.css',
})
export class PartClassSelector implements FormValueControl<PartClassFilter> {
  readonly value = model<PartClassFilter>('all');

  protected readonly options: PartClassOption[] = [
    { value: 'all', label: 'All', icon: 'check' },
    { value: 'oem', label: 'OEM', icon: 'gear' },
    { value: 'quality-alternative', label: 'Quality alternatives', icon: 'thumbs-up' },
    { value: 'budget-alternative', label: 'Budget alternatives', icon: 'piggy-bank' },
  ];

  protected select(value: PartClassFilter): void {
    this.value.set(value);
  }
}
