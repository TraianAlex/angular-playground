import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface CheatSection {
  title: string;
  bullets: string[];
}

@Component({
  selector: 'app-cheat-sheet-page',
  imports: [CommonModule],
  templateUrl: './cheat-sheet-page.html',
  styleUrl: './cheat-sheet-page.css'
})
export class CheatSheetPage {
  readonly sections: CheatSection[] = [
    {
      title: 'Core Concepts',
      bullets: [
        'Standalone components are now the default mental model.',
        'Use DI scopes (root/route/component) intentionally.',
        'Signals are excellent for local synchronous state.'
      ]
    },
    {
      title: 'Routing and State',
      bullets: [
        'Keep shareable state in URLs.',
        'Use resolvers for must-have initial data only.',
        'Services own shared feature state lifecycles.'
      ]
    },
    {
      title: 'Performance and Testing',
      bullets: [
        'Prefer OnPush + immutable updates + trackBy.',
        'Model loading/success/error states clearly.',
        'Test user outcomes and async failure paths.'
      ]
    }
  ];

  downloadCheatSheet() {
    const lines = [
      '# Angular Interview Cheat Sheet',
      '',
      ...this.sections.flatMap((section) => [
        `## ${section.title}`,
        ...section.bullets.map((bullet) => `- ${bullet}`),
        ''
      ])
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'angular-interview-cheat-sheet.md';
    anchor.click();
    URL.revokeObjectURL(url);
  }
}
