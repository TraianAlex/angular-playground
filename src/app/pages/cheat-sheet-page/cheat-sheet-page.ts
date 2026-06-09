import { Component } from '@angular/core';
import { sections } from './utils';

@Component({
  selector: 'app-cheat-sheet-page',
  imports: [],
  templateUrl: './cheat-sheet-page.html',
  styleUrl: './cheat-sheet-page.css',
})
export class CheatSheetPage {
  readonly sections = sections;

  downloadCheatSheet() {
    const lines = [
      '# Angular Interview Cheat Sheet',
      '',
      ...sections.flatMap((section) => [
        `## ${section.title}`,
        ...section.bullets.map((bullet) => `- ${bullet}`),
        '',
      ]),
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
