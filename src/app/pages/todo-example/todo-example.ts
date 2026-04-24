import { Component, computed, inject, resource, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { FakeApiService, TodoItem } from '../../services/fake-api.service';

@Component({
  selector: 'app-todo-example',
  imports: [FormsModule],
  templateUrl: './todo-example.html',
  styleUrl: './todo-example.css',
})
export class TodoExample {
  private readonly fakeApi = inject(FakeApiService);
  private readonly reloadToken = signal(0);
  private readonly mutating = signal(false);
  readonly newTitle = signal('');

  readonly todosResource = resource<TodoItem[], number>({
    params: () => this.reloadToken(),
    loader: async () => firstValueFrom(this.fakeApi.listTodos()),
  });
  readonly todos = computed(() => this.todosResource.value() ?? []);
  readonly loading = computed(() => this.todosResource.isLoading() || this.mutating());
  readonly status = computed(() => {
    if (this.todosResource.isLoading()) {
      return 'Loading todos from fake server (1s latency)...';
    }
    if (this.mutating()) {
      return 'Saving changes to fake API...';
    }
    if (this.todosResource.error()) {
      return 'Failed to load todo data.';
    }
    return 'Data loaded from local JSON API simulation.';
  });

  async addTodo() {
    const title = this.newTitle().trim();
    if (!title) {
      return;
    }

    this.mutating.set(true);
    try {
      await firstValueFrom(this.fakeApi.createTodo(title));
      this.newTitle.set('');
      this.reloadToken.update((value) => value + 1);
    } finally {
      this.mutating.set(false);
    }
  }

  async toggleTodo(todo: TodoItem) {
    this.mutating.set(true);
    try {
      await firstValueFrom(this.fakeApi.updateTodo({ ...todo, completed: !todo.completed }));
      this.reloadToken.update((value) => value + 1);
    } finally {
      this.mutating.set(false);
    }
  }

  async removeTodo(id: number) {
    this.mutating.set(true);
    try {
      await firstValueFrom(this.fakeApi.deleteTodo(id));
      this.reloadToken.update((value) => value + 1);
    } finally {
      this.mutating.set(false);
    }
  }
}
