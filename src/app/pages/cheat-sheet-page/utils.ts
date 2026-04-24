interface CheatSection {
  title: string;
  bullets: string[];
}

export const sections: CheatSection[] = [
  {
    title: 'Architecture and Fundamentals',
    bullets: [
      'Prefer standalone components with feature-first route boundaries; keep shared code explicit.',
      'Use DI scopes intentionally: root for app singletons, route/component for feature isolation.',
      'Keep components thin: UI orchestration in components, business/data access in services.',
      'Separate domain models from transport DTOs to reduce backend-coupling in templates.',
    ],
  },
  {
    title: 'State, Signals, and Async',
    bullets: [
      'Use `signal()` for local writable state and `computed()` for pure derived state.',
      'Use `resource()` (Angular 20/21) for async loading/error lifecycle instead of manual flags.',
      'Use `effect()` only for side effects (storage, analytics, imperative APIs), not derivations.',
      'Use RxJS for cancellation/concurrency workflows; use signals for local synchronous UI state.',
    ],
  },
  {
    title: 'Routing and Data Flow',
    bullets: [
      'Keep shareable UI state in the URL (filters, tabs, pagination) for deep-link and reload safety.',
      'Use resolvers only when first render must be complete; stream non-critical data after paint.',
      'Fetch data in dedicated services attached to features; use shared services only when truly reused.',
      'Return typed APIs from services and centralize retries/error mapping there.',
    ],
  },
  {
    title: 'Performance and Testing',
    bullets: [
      'Use OnPush mindset, immutable updates, and stable `trackBy` for list-heavy UIs.',
      'Profile before optimizing; report before/after metrics rather than anecdotal speedups.',
      'Model `loading/success/error/empty` states explicitly and test each user-visible state.',
      'Test outcomes, not internals: user interactions, rendered state, and failure/retry behavior.',
    ],
  },
  {
    title: 'Angular 20/21 Interview Notes',
    bullets: [
      'Highlight modern reactivity with signals and resources as the default direction for component state.',
      'Explain interoperability: signals for local state, RxJS for stream orchestration and cancellation.',
      'Mention incremental adoption strategy: start with new feature code, then refactor legacy zones safely.',
      'Reference official docs/release notes when discussing upgrades, not assumptions from older Angular versions.',
    ],
  },
];