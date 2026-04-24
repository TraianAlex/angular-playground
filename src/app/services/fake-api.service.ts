import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { delay, map, of, switchMap, tap } from 'rxjs';

export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class FakeApiService {
  private readonly todos = signal<TodoItem[]>([]);
  private initialized = false;

  constructor(private readonly http: HttpClient) {}

  listTodos() {
    return this.ensureInit().pipe(map(() => this.todos()));
  }

  createTodo(title: string) {
    return this.ensureInit().pipe(
      map(() => {
        const next: TodoItem = {
          id: Math.max(0, ...this.todos().map((todo) => todo.id)) + 1,
          title,
          completed: false
        };
        this.todos.update((items) => [next, ...items]);
        return next;
      }),
      delay(1000)
    );
  }

  updateTodo(updated: TodoItem) {
    return of(updated).pipe(
      delay(1000),
      tap((todo) => {
        this.todos.update((items) => items.map((item) => (item.id === todo.id ? todo : item)));
      })
    );
  }

  deleteTodo(id: number) {
    return of(id).pipe(
      delay(1000),
      tap((todoId) => {
        this.todos.update((items) => items.filter((item) => item.id !== todoId));
      })
    );
  }

  private ensureInit() {
    if (this.initialized) {
      return of(void 0).pipe(delay(1000));
    }

    return this.http.get<TodoItem[]>('/data/todos.json').pipe(
      delay(1000),
      tap((items) => {
        this.todos.set(items);
        this.initialized = true;
      }),
      map(() => void 0),
      switchMap(() => of(void 0))
    );
  }
}
