import type { Request, Response } from 'express';
import { getOemStatus, searchParts } from './mock-data';

export function handleCarPartsValidate(req: Request, res: Response): void {
  const oem = String(req.query['oem'] ?? '').toUpperCase();
  const status = getOemStatus(oem);

  if (!status) {
    res.status(404).json({ message: 'OEM number not found' });
    return;
  }

  res.json({ oem, status });
}

export function handleCarPartsSearch(req: Request, res: Response): void {
  const vin = String(req.query['vin'] ?? '');
  const oem = String(req.query['oem'] ?? '');
  const partClass = String(req.query['partClass'] ?? '');

  res.json(
    searchParts({
      vin: vin || undefined,
      oem: oem || undefined,
      partClass: partClass || undefined,
    }),
  );
}
