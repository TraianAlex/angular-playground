import { HttpErrorResponse } from '@angular/common/http';

export function getHttpStatus(error: unknown): number {
  if (error instanceof HttpErrorResponse) {
    return error.status;
  }
  if (typeof error === 'number') {
    return error;
  }
  return 500;
}
