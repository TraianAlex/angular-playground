import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface PublicUser {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

@Injectable({ providedIn: 'root' })
export class PublicUsersService {
  private readonly http = inject(HttpClient);

  listUsers(): Observable<PublicUser[]> {
    return this.http.get<PublicUser[]>('https://jsonplaceholder.typicode.com/users');
  }
}
