import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

const DEFAULT_COMPONENT = `import { Component } from '@angular/core';

@Component({
  selector: 'app-demo-counter'
})
export class DemoCounter {
  title = 'Angular Sandbox';
  count = 0;

  increment() {
    this.count += 1;
  }
}`;

const DEFAULT_HTML = `<section class="card">
  <h2>{{ title }}</h2>
  <p>You clicked {{ count }} times</p>
  <button (click)="increment()" [disabled]="count >= 10">Click me</button>
</section>`;

const DEFAULT_CSS = `.card {
  padding: 1rem;
  border-radius: 10px;
  background: #111827;
  color: #fff;
}
button {
  border: 0;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
}`;

@Component({
  selector: 'app-sandbox-page',
  imports: [FormsModule],
  templateUrl: './sandbox-page.html',
  styleUrl: './sandbox-page.css',
})
export class SandboxPage implements AfterViewInit {
  readonly previewFrame = viewChild<ElementRef<HTMLIFrameElement>>('previewFrame');

  readonly componentCode = signal(DEFAULT_COMPONENT);
  readonly htmlCode = signal(DEFAULT_HTML);
  readonly cssCode = signal(DEFAULT_CSS);

  readonly htmlVisible = signal(true);
  readonly cssVisible = signal(true);
  readonly tsVisible = signal(true);
  readonly tallEditors = signal(false);

  private runId = 0;
  private debounceTimer?: number;

  ngAfterViewInit(): void {
    this.runPreview();
  }

  onEditorInput(): void {
    if (this.debounceTimer) {
      window.clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = window.setTimeout(() => this.runPreview(), 500);
  }

  runPreview(): void {
    const iframe = this.previewFrame()?.nativeElement;
    if (!iframe) {
      return;
    }

    this.runId += 1;
    const currentRunId = this.runId;

    const writeDocument = (doc: Document) => {
      doc.open();
      doc.write(`
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <style>
              body {
                margin: 0;
                font-family: system-ui, sans-serif;
                background: #111827;
                color: #f9fafb;
                padding: 16px;
              }
              ${this.cssCode()}
            </style>
          </head>
          <body>
            <div id="app"></div>
            <script>
              const componentSource = ${JSON.stringify(this.componentCode())};
              const template = ${JSON.stringify(this.htmlCode())};

              function evaluateExpression(expression, state) {
                try {
                  return new Function('state', 'with (state) { return (' + expression + '); }')(state);
                } catch (_error) {
                  return '';
                }
              }

              function createStateFromComponent(source) {
                const withoutImports = source.replace(/^\\s*import[^;]+;\\s*$/gm, '');
                const withoutDecorator = withoutImports.replace(/@Component\\s*\\(\\s*\\{[\\s\\S]*?\\}\\s*\\)\\s*/m, '');
                const normalized = withoutDecorator.replace(/export\\s+class\\s+/, 'class ');
                const classMatch = normalized.match(/class\\s+(\\w+)/);

                if (!classMatch) {
                  throw new Error('Component class not found. Use: export class MyComponent { ... }');
                }

                const className = classMatch[1];

                // Minimal Angular-like signal runtime so sandbox code can use:
                // const value = signal(0); value(); value.set(1); value.update(v => v + 1)
                const createSignal = (initialValue) => {
                  let current = initialValue;
                  const read = () => current;
                  read.set = (nextValue) => {
                    current = nextValue;
                  };
                  read.update = (updater) => {
                    current = updater(current);
                  };
                  return read;
                };

                return new Function(
                  'signal',
                  normalized + '\\nreturn new ' + className + '();'
                )(createSignal);
              }

              const state = createStateFromComponent(componentSource);

              function render() {
                const app = document.getElementById('app');
                if (!app) return;

                const view = template.replace(/{{\\s*([^}]+)\\s*}}/g, (_match, expression) => {
                  const value = evaluateExpression(expression, state);
                  return value == null ? '' : String(value);
                });

                app.innerHTML = view;

                app.querySelectorAll('*').forEach((el) => {
                  const clickExpr = el.getAttribute('(click)');
                  if (clickExpr) {
                    const methodName = clickExpr.replace('()', '').trim();
                    el.addEventListener('click', () => {
                      if (typeof state[methodName] === 'function') {
                        state[methodName].call(state);
                        render();
                      }
                    });
                  }

                  const disabledExpr = el.getAttribute('[disabled]');
                  if (disabledExpr) {
                    const disabled = evaluateExpression(disabledExpr, state);
                    if (disabled) {
                      el.setAttribute('disabled', 'disabled');
                    } else {
                      el.removeAttribute('disabled');
                    }
                  }
                });
              }

              try {
                render();
              } catch (error) {
                const app = document.getElementById('app');
                if (app) {
                  app.innerHTML = '<pre style="color:#fca5a5;white-space:pre-wrap;">' + String(error) + '</pre>';
                }
              }
            <\/script>
          </body>
        </html>
      `);
      doc.close();
    };

    iframe.onload = () => {
      if (currentRunId !== this.runId) {
        return;
      }

      const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
      if (doc) {
        writeDocument(doc);
      }
      iframe.onload = null;
    };

    iframe.src = 'about:blank';
  }

  resetPreview(): void {
    this.componentCode.set(DEFAULT_COMPONENT);
    this.htmlCode.set(DEFAULT_HTML);
    this.cssCode.set(DEFAULT_CSS);

    this.htmlVisible.set(true);
    this.cssVisible.set(true);
    this.tsVisible.set(true);

    this.runPreview();
  }

  hidePane(pane: 'html' | 'css' | 'ts'): void {
    const visibleCount = [this.htmlVisible(), this.cssVisible(), this.tsVisible()].filter(
      Boolean,
    ).length;
    if (visibleCount <= 1) {
      return;
    }

    if (pane === 'html') this.htmlVisible.set(false);
    if (pane === 'css') this.cssVisible.set(false);
    if (pane === 'ts') this.tsVisible.set(false);
  }

  showPane(pane: 'html' | 'css' | 'ts'): void {
    if (pane === 'html') this.htmlVisible.set(true);
    if (pane === 'css') this.cssVisible.set(true);
    if (pane === 'ts') this.tsVisible.set(true);
  }

  toggleEditorsHeight(): void {
    this.tallEditors.update((value) => !value);
  }
}
