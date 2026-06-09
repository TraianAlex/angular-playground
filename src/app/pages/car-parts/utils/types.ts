import { CarPartClass } from '../../../models/car-part.model';

export type PartClassFilter = 'all' | CarPartClass;

export interface CarPartsSearchModel {
  vin: string;
  oem: string;
  partClass: PartClassFilter;
}
