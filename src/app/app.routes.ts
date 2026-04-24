import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'docs/fundamentals' },
  {
    path: 'docs/:slug',
    loadComponent: () => import('./pages/docs-page/docs-page').then((m) => m.DocsPage)
  },
  {
    path: 'examples/todo-crud',
    loadComponent: () => import('./pages/todo-example/todo-example').then((m) => m.TodoExample)
  },
  {
    path: 'examples/public-api-users',
    loadComponent: () =>
      import('./pages/public-api-example/public-api-example').then((m) => m.PublicApiExample)
  },
  {
    path: 'mock-interview',
    loadComponent: () =>
      import('./pages/mock-interview-page/mock-interview-page').then((m) => m.MockInterviewPage)
  },
  {
    path: 'cheat-sheet',
    loadComponent: () =>
      import('./pages/cheat-sheet-page/cheat-sheet-page').then((m) => m.CheatSheetPage)
  },
  {
    path: 'sandbox',
    loadComponent: () => import('./pages/sandbox-page/sandbox-page').then((m) => m.SandboxPage)
  },
  {
    path: 'blank-test',
    loadComponent: () => import('./pages/blank-test-page/blank-test-page').then((m) => m.BlankTestPage)
  },
  { path: '**', redirectTo: 'docs/fundamentals' }
];
