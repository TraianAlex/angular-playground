import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { DOC_PAGES } from '../../docs-content';

@Component({
  selector: 'app-docs-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './docs-page.html',
  styleUrl: './docs-page.css'
})
export class DocsPage {
  private readonly route = inject(ActivatedRoute);

  readonly page$ = this.route.paramMap.pipe(
    map((params) => params.get('slug') ?? 'fundamentals'),
    map((slug) => DOC_PAGES.find((page) => page.slug === slug) ?? DOC_PAGES[0])
  );

  readonly allPages = DOC_PAGES;
  readonly today = computed(() => new Date().toLocaleDateString());
}
