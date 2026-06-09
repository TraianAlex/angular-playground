export const CAR_PART_STATUS_VALUES = ['available', 'unavailable'] as const;
export type CarPartStatus = (typeof CAR_PART_STATUS_VALUES)[number];

export const CAR_PART_CLASS_VALUES = ['oem', 'quality-alternative', 'budget-alternative'] as const;
export type CarPartClass = (typeof CAR_PART_CLASS_VALUES)[number];

export type CarPart = {
  id: string;
  oem: string;
  name: string;
  brand: string;
  category: string;
  status: CarPartStatus;
  partClass: CarPartClass;
};
