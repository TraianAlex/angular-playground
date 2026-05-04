import { Component, computed, signal } from '@angular/core';
import { applyEach, debounce, email, form, FormField, FormRoot, min, minLength, required, SchemaPathTree, validate } from '@angular/forms/signals';

@Component({
  selector: 'app-blank-test-page',
  imports: [FormField, FormRoot],
  templateUrl: './blank-test-page.html',
  styleUrl: './blank-test-page.css'
})
export class BlankTestPage {
  protected readonly regModel = signal({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    items: [{ id: crypto.randomUUID(), product: '', quantity: 1, price: 0 }]
  });

  protected readonly regForm = form(
    this.regModel,
    (f) => {
      debounce(f.username, 400); // for the async validation of username or at the level of validator
      required(f.username, { message: 'Username is required' });
      required(f.email);
      email(f.email, { message: 'Enter a valid email address' });
      required(f.password, { message: 'Password is required' });
      minLength(f.password, 8, { message: 'Password must be at least 8 characters' });
      required(f.confirmPassword, { message: 'Confirm your password' });
      validate(f.confirmPassword, ({ value, valueOf }) => {
        const password = valueOf(f.password);
        const confirmPassword = value();
        if (password && confirmPassword && password !== confirmPassword) {
          return {
            kind: 'mismatch',
            message: 'Passwords do not match',
          };
        }
        return undefined;
      });
      applyEach(f.items, (item: SchemaPathTree<{ id: `${string}-${string}-${string}-${string}-${string}`; product: string; quantity: number; price: number; }, any>) => {
        required(item.product, { message: 'Product is required' });
        min(item.quantity, 1, { message: 'Quantity must be at least 1' });
        min(item.price, 10, { message: 'Price must be at least 10' });
      });
    },
    {
      submission: {
        action: async () => {
          console.log('Registration payload:', this.regModel());
          return undefined;
        },
      },
    },
  );

  addItem() {
    this.regModel.update((current) => ({
      ...current,
      items: [...current.items, { id: crypto.randomUUID(), product: '', quantity: 1, price: 0 }]
    }));
  }

  removeItem(index: number) {
    this.regModel.update((current) => ({
      ...current,
      items: current.items.filter((_, i) => i !== index)
    }));
  }

  protected readonly calculateTotal = computed(() => {
    return this.regModel().items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  });
}
