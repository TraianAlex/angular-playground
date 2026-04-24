import { DocPage } from './models/docs.model';

export const DOC_PAGES: DocPage[] = [
  {
    slug: 'fundamentals',
    title: 'Angular Fundamentals',
    subtitle: 'Core building blocks every interview expects.',
    interviewFocus:
      'Explain standalone components, dependency injection, signals, and why Angular structure helps teams scale safely.',
    sections: [
      {
        id: 'standalone',
        title: 'Standalone Architecture',
        content: [
          'Modern Angular uses standalone components instead of NgModules for most app code. This keeps feature wiring close to where it is used.',
          'In interviews, mention that standalone still needs modular design: route boundaries, feature ownership, and clean shared utilities.'
        ]
      },
      {
        id: 'di',
        title: 'Dependency Injection',
        content: [
          'Angular DI resolves dependencies through hierarchical injectors. Root providers are app singletons; route and component providers scope behavior.',
          'Strong interview point: constructor injection improves testability by making dependencies explicit and mockable.'
        ]
      },
      {
        id: 'signals',
        title: 'Signals and Reactivity',
        content: [
          'Signals provide fine-grained reactive state: signal() for mutable state, computed() for derivation, effect() for side-effects.',
          'Use signals for local UI state, and RxJS streams where async event orchestration, cancellation, or multicasting is needed.'
        ]
      }
    ],
    answerSnippets: [
      'I prefer standalone components because routing and lazy-loading become explicit and easier to reason about at feature boundaries.',
      'Angular DI gives us testable code by injecting dependencies directly in constructors and replacing them with mocks in tests.',
      'Signals improve local UI reactivity by updating only the parts of the template that depend on changed state.'
    ],
    exampleLinks: [
      { label: 'Try Todo CRUD Example', route: '/examples/todo-crud' },
      { label: 'Try Public API Example', route: '/examples/public-api-users' },
      { label: 'Open Component Sandbox', route: '/sandbox' }
    ]
  },
  {
    slug: 'routing-state',
    title: 'Routing and State Patterns',
    subtitle: 'How to structure scalable navigation and feature state.',
    interviewFocus:
      'Know route guards, lazy routes, resolver trade-offs, and when state belongs in URL vs service vs local component.',
    sections: [
      {
        id: 'routing',
        title: 'Router Design',
        content: [
          'Use route-driven architecture: each feature gets a route subtree and optional lazy loading via loadComponent/loadChildren.',
          'Keep URLs meaningful for shareable state like pagination, tabs, and filters.'
        ]
      },
      {
        id: 'guards',
        title: 'Guards and Resolvers',
        content: [
          'Guards decide navigation rights. Resolvers preload essential data when first render requires completeness.',
          'Interview nuance: resolvers improve determinism but can delay paint; use in-component loading for non-blocking secondary data.'
        ]
      },
      {
        id: 'state',
        title: 'State Strategy',
        content: [
          'Local state fits isolated UI logic. Shared state belongs in services using signals and/or observables.',
          'Separate server-state from form/edit-state to avoid mutation leaks and stale views.'
        ]
      }
    ],
    answerSnippets: [
      'I keep shareable UI state in the URL so users can reload and deep-link without losing context.',
      'Resolvers are useful for must-have initial data, while non-critical data can stream after render for better perceived performance.',
      'Service-level state is ideal when multiple components depend on the same data lifecycle.'
    ],
    exampleLinks: [
      { label: 'Try Todo CRUD Example', route: '/examples/todo-crud' },
      { label: 'See Public API Loading', route: '/examples/public-api-users' },
      { label: 'Practice in Sandbox', route: '/sandbox' }
    ]
  },
  {
    slug: 'http-testing',
    title: 'HTTP, Async and Testing',
    subtitle: 'Production behavior and interview-ready confidence.',
    interviewFocus:
      'Describe layered API services, typed models, loading/error states, and async test strategy.',
    sections: [
      {
        id: 'http',
        title: 'HTTP Layer Basics',
        content: [
          'Wrap HTTP in dedicated services, keep components focused on interaction and rendering.',
          'Map DTOs to UI models so backend contract changes are isolated from component templates.'
        ]
      },
      {
        id: 'async',
        title: 'Latency and UX',
        content: [
          'Always model loading, success, and error states explicitly. Avoid hidden async assumptions in templates.',
          'Use fake delays during development to pressure-test user experience and fallback behavior.'
        ]
      },
      {
        id: 'testing',
        title: 'Testing Talking Points',
        content: [
          'Component tests should assert user-visible outcomes and interactions, not private implementation details.',
          'Service tests should verify API mapping, retry policy, and error transitions.'
        ]
      }
    ],
    answerSnippets: [
      'I isolate HTTP calls in services and expose typed models so components remain stable when backend DTOs change.',
      'For async UX, I always model loading, success, and error states to avoid ambiguous behavior.',
      'My tests focus on user-observable behavior and service state transitions under failure and retry scenarios.'
    ],
    exampleLinks: [
      { label: 'Inspect Delayed CRUD Flow', route: '/examples/todo-crud' },
      { label: 'Inspect Public API Flow', route: '/examples/public-api-users' },
      { label: 'Build and Preview Component', route: '/sandbox' }
    ]
  },
  {
    slug: 'rxjs-async',
    title: 'RxJS and Async Patterns',
    subtitle: 'Streams, cancellation, and error resilience.',
    interviewFocus:
      'Explain switchMap vs mergeMap, subscription lifetime handling, and practical retry/caching choices.',
    sections: [
      {
        id: 'operators',
        title: 'Operator Choice',
        content: [
          'switchMap cancels stale requests for search/autocomplete scenarios. mergeMap runs concurrently when all requests matter.',
          'concatMap preserves order for queued side effects and updates.'
        ]
      },
      {
        id: 'lifecycles',
        title: 'Subscription Lifecycles',
        content: [
          'Use async pipe where possible to avoid manual subscription management.',
          'When subscribing in code, bind to component lifecycle boundaries so streams terminate cleanly.'
        ]
      },
      {
        id: 'errors',
        title: 'Error and Retry Strategy',
        content: [
          'Surface user-safe errors and keep logs diagnostic. Distinguish validation, auth, and infrastructure failures.',
          'Retry only transient faults with limits/backoff. Do not blindly retry all failures.'
        ]
      }
    ],
    answerSnippets: [
      'I use switchMap for typeahead to cancel stale HTTP requests and keep only the latest user intent.',
      'I favor async pipe for template streams to avoid manual subscribe/unsubscribe boilerplate.',
      'Retries should be selective and bounded, not automatic for every failure type.'
    ],
    exampleLinks: [
      { label: 'Public API Example (async)', route: '/examples/public-api-users' },
      { label: 'Todo CRUD with delay', route: '/examples/todo-crud' },
      { label: 'Sandbox Experiments', route: '/sandbox' }
    ]
  },
  {
    slug: 'change-detection-performance',
    title: 'Change Detection and Performance',
    subtitle: 'Render efficiently and explain why it matters.',
    interviewFocus:
      'Be prepared to discuss OnPush, immutable update patterns, trackBy, and where profiling fits in optimization.',
    sections: [
      {
        id: 'onpush',
        title: 'OnPush Mindset',
        content: [
          'OnPush encourages explicit state transitions and predictable rendering boundaries.',
          'Pair OnPush with immutable updates so Angular can detect reference changes reliably.'
        ]
      },
      {
        id: 'lists',
        title: 'Large Lists and trackBy',
        content: [
          'Always use stable trackBy in repeated lists to avoid unnecessary DOM recreation.',
          'Chunk heavy rendering and virtualize when list size is large enough to impact frame rate.'
        ]
      },
      {
        id: 'profiling',
        title: 'Profiling Story',
        content: [
          'Start with measurable baseline before changing code. Validate improvements with production-like data shape.',
          'Interviewers value methodical profiling more than random micro-optimizations.'
        ]
      }
    ],
    answerSnippets: [
      'I use OnPush plus immutable updates to reduce unnecessary checks and make rendering behavior predictable.',
      'A stable trackBy function is mandatory for large lists to prevent DOM thrashing.',
      'Performance changes should always be backed by profiling baselines and before/after metrics.'
    ],
    exampleLinks: [
      { label: 'Review list updates in Todo CRUD', route: '/examples/todo-crud' },
      { label: 'Live tweak in Sandbox', route: '/sandbox' },
      { label: 'Public API Rendering', route: '/examples/public-api-users' }
    ]
  },
  {
    slug: 'forms-validation',
    title: 'Forms and Validation',
    subtitle: 'Reliable input handling in enterprise apps.',
    interviewFocus:
      'Know reactive forms, custom validators, async validation, and mapping server errors back to controls.',
    sections: [
      {
        id: 'form-architecture',
        title: 'Reactive Form Architecture',
        content: [
          'Reactive forms centralize validation and state transitions in TypeScript, making complex forms easier to reason about.',
          'Strong answer: model forms from domain use-cases rather than mirroring API payloads directly.'
        ]
      },
      {
        id: 'validators',
        title: 'Validation Strategy',
        content: [
          'Combine sync validators for format rules and async validators for uniqueness/server checks.',
          'Display helpful errors only after interaction intent (dirty/touched/submit) to reduce noisy UX.'
        ]
      },
      {
        id: 'submission',
        title: 'Submission and Error Mapping',
        content: [
          'Disable submit while pending and guard against duplicate submissions.',
          'Map backend field errors to exact controls so users can recover quickly.'
        ]
      }
    ],
    answerSnippets: [
      'Reactive forms are ideal for complex validation because rules and state transitions are centralized and testable.',
      'I show validation feedback based on user intent, not instantly, to avoid overwhelming users.',
      'Server-side validation errors should map back to the exact form controls for fast correction.'
    ],
    exampleLinks: [
      { label: 'Practice form rendering in Sandbox', route: '/sandbox' },
      { label: 'Observe async patterns with Public API', route: '/examples/public-api-users' },
      { label: 'Todo CRUD Interaction', route: '/examples/todo-crud' }
    ]
  }
];
