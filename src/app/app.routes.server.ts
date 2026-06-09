import { RenderMode, ServerRoute } from '@angular/ssr';
import { DOC_PAGES } from './docs-content';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'docs/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return DOC_PAGES.map((page) => ({ slug: page.slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
