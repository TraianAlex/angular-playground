import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal, inject } from '@angular/core';

interface PublicUser {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

@Component({
  selector: 'app-public-api-example',
  imports: [],
  templateUrl: './public-api-example.html',
  styleUrl: './public-api-example.css',
})
export class PublicApiExample implements OnInit {
  private readonly http = inject(HttpClient);

  readonly users = signal<PublicUser[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly status = signal('Ready to load users from JSONPlaceholder');

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);
    this.error.set('');
    this.status.set('Fetching users from public API...');

    this.http.get<PublicUser[]>('https://jsonplaceholder.typicode.com/users').subscribe({
      next: (users) => {
        this.users.set(users);
        this.loading.set(false);
        this.status.set('Public API loaded. This is useful for interview API demos.');
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Failed to load users. Check internet connection and retry.');
        this.status.set('Public API request failed.');
      },
    });
  }
}
