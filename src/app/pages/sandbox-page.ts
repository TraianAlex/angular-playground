import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sandbox-page',
  imports: [FormsModule],
  templateUrl: './sandbox-page.html',
  styleUrl: './sandbox-page.css'
})
export class SandboxPage {
  readonly componentCode = signal(`export default {
  title: 'Angular Sandbox',
  count: 0,
  increment() {
    this.count += 1;
  }
};`);

  readonly htmlCode = signal(`<section class="card">
  <h2>{{ title }}</h2>
  <p>You clicked {{ count }} times</p>
  <button data-action="increment">Click me</button>
</section>`);

  readonly cssCode = signal(`.card {
  padding: 1rem;
  border-radius: 10px;
  background: #111827;
  color: #fff;
}
button {
  border: 0;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
}`);

  readonly preview = computed(() => this.buildPreview());

  constructor(private readonly sanitizer: DomSanitizer) {}

  private buildPreview(): SafeHtml {
    const escapedComponent = JSON.stringify(this.componentCode());
    const escapedHtml = JSON.stringify(this.htmlCode());
    const escapedCss = JSON.stringify(this.cssCode());

    const srcdoc = `
      <html>
      <body>
        <div id="app"></div>
        <style>${this.cssCode()}</style>
        <script>
          const source = ${escapedComponent};
          const template = ${escapedHtml};
          const stateFactory = new Function(source.replace('export default', 'return'));
          const state = stateFactory();

          function render() {
            const app = document.getElementById('app');
            if (!app) return;
            let view = template.replace(/{{\\s*(\\w+)\\s*}}/g, (_, key) => state[key] ?? '');
            app.innerHTML = view;
            app.querySelectorAll('[data-action]').forEach((el) => {
              const action = el.getAttribute('data-action');
              el.addEventListener('click', () => {
                if (action && typeof state[action] === 'function') {
                  state[action].call(state);
                  render();
                }
              });
            });
          }

          render();
        </script>
      </body>
      </html>
    `;

    return this.sanitizer.bypassSecurityTrustHtml(
      `<iframe title="preview" style="width:100%;height:100%;border:0;" srcdoc=${JSON.stringify(srcdoc)}></iframe>`
    );
  }

  loadCounterPreset() {
    this.componentCode.set(`export default {
  title: 'Counter Challenge',
  count: 10,
  increment() {
    this.count += 2;
  }
};`);
  }
}
