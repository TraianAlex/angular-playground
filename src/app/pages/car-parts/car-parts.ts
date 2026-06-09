import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchForm } from './search-form/search-form';

@Component({
  selector: 'app-car-parts',
  imports: [SearchForm],
  templateUrl: './car-parts.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './car-parts.css',
})
export class CarParts {}
