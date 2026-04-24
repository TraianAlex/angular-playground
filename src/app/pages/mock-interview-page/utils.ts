interface InterviewQuestion {
  question: string;
  hints: string[];
  sampleAnswer: string;
}

export const questions: InterviewQuestion[] = [
  {
    question: 'Explain the difference between signals and RxJS observables in Angular.',
    hints: ['Local UI state', 'Async orchestration', 'Granularity'],
    sampleAnswer:
      'Signals are ideal for synchronous local UI state with fine-grained updates, while RxJS observables are better for async streams, cancellation, and event composition.',
  },
  {
    question: 'When would you use a resolver versus loading data inside the component?',
    hints: ['Critical first render', 'Perceived latency', 'Error handling strategy'],
    sampleAnswer:
      'I use resolvers when the page cannot render meaningfully without initial data. For non-critical data, I load in-component so the shell appears quickly with progressive loading states.',
  },
  {
    question: 'How do you optimize Angular rendering for large lists?',
    hints: ['trackBy', 'OnPush', 'Virtualization'],
    sampleAnswer:
      'I combine OnPush change detection, immutable updates, and stable trackBy functions. For very large datasets, I virtualize list rendering and profile before/after impact.',
  },
  {
    question: 'How do you test HTTP-dependent UI features?',
    hints: ['Service isolation', 'State assertions', 'Failure scenarios'],
    sampleAnswer:
      'I isolate API calls in services, mock responses in tests, and assert user-visible states across loading, success, and error paths, including retries and edge cases.',
  },
];