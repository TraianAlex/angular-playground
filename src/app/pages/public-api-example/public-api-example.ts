import { Component, computed, inject, resource, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PublicUser, PublicUsersService } from '../../services/public-users.service';

@Component({
  selector: 'app-public-api-example',
  imports: [],
  templateUrl: './public-api-example.html',
  styleUrl: './public-api-example.css',
})
export class PublicApiExample {
  private readonly publicUsersService = inject(PublicUsersService);
  private readonly reloadToken = signal(0);

  readonly usersResource = resource<PublicUser[], number>({
    params: () => this.reloadToken(),
    loader: async () => firstValueFrom(this.publicUsersService.listUsers()),
  });

  readonly users = computed(() => this.usersResource.value() ?? []);
  readonly loading = computed(() => this.usersResource.isLoading());
  readonly error = computed(() =>
    this.usersResource.error() ? 'Failed to load users. Check internet connection and retry.' : '',
  );
  readonly status = computed(() => {
    if (this.loading()) {
      return 'Fetching users from public API...';
    }
    if (this.error()) {
      return 'Public API request failed.';
    }
    if (this.users().length > 0) {
      return 'Public API loaded. This is useful for interview API demos.';
    }
    return 'Ready to load users from JSONPlaceholder';
  });

  loadUsers() {
    this.reloadToken.update((value) => value + 1);
  }
}
