import { Component, computed, signal } from '@angular/core';
import { questions } from './utils';

@Component({
  selector: 'app-mock-interview-page',
  imports: [],
  templateUrl: './mock-interview-page.html',
  styleUrl: './mock-interview-page.css',
})
export class MockInterviewPage {
  readonly questions = questions;

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
