import { CarPart, CarPartStatus } from '../../../models/car-part.model';

export const OEM_CATALOG: Record<string, CarPartStatus> = {
  '12345-ABCDE': 'available',
  '67890-XYZ12': 'available',
  '99999-ZZZZZ': 'unavailable',
};

export const MOCK_PARTS: CarPart[] = [
  {
    id: '1',
    oem: '12345-ABCDE',
    name: 'Front Brake Pad Set',
    brand: 'Toyota',
    category: 'Brakes',
    status: 'available',
    partClass: 'oem',
  },
  {
    id: '2',
    oem: '12345-ABCDE',
    name: 'Front Brake Pad - Premium',
    brand: 'Akebono',
    category: 'Brakes',
    status: 'available',
    partClass: 'quality-alternative',
  },
  {
    id: '3',
    oem: '12345-ABCDE',
    name: 'Front Brake Pad - Economy',
    brand: 'ValueLine',
    category: 'Brakes',
    status: 'available',
    partClass: 'budget-alternative',
  },
  {
    id: '4',
    oem: '67890-XYZ12',
    name: 'Oil Filter',
    brand: 'Toyota',
    category: 'Engine',
    status: 'available',
    partClass: 'oem',
  },
  {
    id: '5',
    oem: '67890-XYZ12',
    name: 'Oil Filter - Premium',
    brand: 'Denso',
    category: 'Engine',
    status: 'available',
    partClass: 'quality-alternative',
  },
];

export function getOemStatus(oem: string): CarPartStatus | null {
  return OEM_CATALOG[oem.toUpperCase()] ?? null;
}

export function searchParts(query: {
  vin?: string;
  oem?: string;
  partClass?: string;
}): CarPart[] {
  let results = [...MOCK_PARTS];

  if (query.oem) {
    results = results.filter((part) => part.oem.toUpperCase() === query.oem!.toUpperCase());
  }

  if (query.partClass && query.partClass !== 'all') {
    results = results.filter((part) => part.partClass === query.partClass);
  }

  // VIN is accepted for demo purposes but does not change the catalog data yet.
  if (query.vin) {
    results = results.map((part) => ({ ...part }));
  }

  return results;
}
