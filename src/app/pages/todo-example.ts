import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FakeApiService, TodoItem } from '../services/fake-api.service';

@Component({
  selector: 'app-todo-example',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-example.html',
  styleUrl: './todo-example.css'
})
export class TodoExample implements OnInit {
  readonly todos = signal<TodoItem[]>([]);
  readonly loading = signal(false);
  readonly newTitle = signal('');
  readonly status = signal('');

  constructor(private readonly fakeApi: FakeApiService) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos() {
    this.loading.set(true);
    this.status.set('Loading todos from fake server (1s latency)...');
    this.fakeApi.listTodos().subscribe({
      next: (items) => {
        this.todos.set(items);
        this.loading.set(false);
        this.status.set('Data loaded from local JSON API simulation.');
      }
    });
  }

  addTodo() {
    const title = this.newTitle().trim();
    if (!title) {
      return;
    }

    this.loading.set(true);
    this.fakeApi.createTodo(title).subscribe({
      next: () => {
        this.newTitle.set('');
        this.fetchTodos();
      }
    });
  }

  toggleTodo(todo: TodoItem) {
    this.loading.set(true);
    this.fakeApi.updateTodo({ ...todo, completed: !todo.completed }).subscribe({
      next: () => this.fetchTodos()
    });
  }

  removeTodo(id: number) {
    this.loading.set(true);
    this.fakeApi.deleteTodo(id).subscribe({
      next: () => this.fetchTodos()
    });
  }
}
