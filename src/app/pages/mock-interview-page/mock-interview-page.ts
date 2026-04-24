import { Component, computed, signal } from '@angular/core';

interface InterviewQuestion {
  question: string;
  hints: string[];
  sampleAnswer: string;
}

@Component({
  selector: 'app-mock-interview-page',
  imports: [],
  templateUrl: './mock-interview-page.html',
  styleUrl: './mock-interview-page.css',
})
export class MockInterviewPage {
  readonly questions: InterviewQuestion[] = [
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

  readonly currentIndex = signal(0);
  readonly showAnswer = signal(false);
  readonly score = signal(0);
  readonly completed = signal(false);

  readonly currentQuestion = computed(() => this.questions[this.currentIndex()]);
  readonly progress = computed(() => `${this.currentIndex() + 1}/${this.questions.length}`);

  revealAnswer() {
    this.showAnswer.set(true);
  }

  markGoodAnswer() {
    this.score.update((value) => value + 1);
    this.goNext();
  }

  markNeedsWork() {
    this.goNext();
  }

  restart() {
    this.currentIndex.set(0);
    this.score.set(0);
    this.completed.set(false);
    this.showAnswer.set(false);
  }

  private goNext() {
    this.showAnswer.set(false);
    const nextIndex = this.currentIndex() + 1;
    if (nextIndex >= this.questions.length) {
      this.completed.set(true);
      return;
    }

    this.currentIndex.set(nextIndex);
  }
}
