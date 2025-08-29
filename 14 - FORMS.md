## Definitions

- **Template-driven Forms**: Forms declared mainly in templates using directives like `ngModel`. Simpler, suitable for basic forms. Requires `FormsModule`.
- **Reactive Forms**: Forms built in code using `FormControl`, `FormGroup`, and `FormBuilder`. More explicit, scalable, and testable. Requires `ReactiveFormsModule`.
- **Form Validation**: Rules that check user input (required, minLength, pattern, custom). Works in both approaches.

---

## Setup

Import the needed modules (standalone or NgModule):

Standalone (example):

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(FormsModule, ReactiveFormsModule)]
});
```

NgModule-based:

```ts
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule]
})
export class AppModule {}
```

---

## Template-driven Forms

Component (`contact.component.ts`):

```ts
import { Component } from '@angular/core';

@Component({ selector: 'app-contact', templateUrl: './contact.component.html' })
export class ContactComponent {
  model = { name: '', email: '', message: '' };

  onSubmit(form: any) {
    if (form.valid) {
      console.log('TD Submit', this.model);
    }
  }
}
```

Template (`contact.component.html`):

```html
<form #f="ngForm" (ngSubmit)="onSubmit(f)">
  <label>
    Name
    <input name="name" [(ngModel)]="model.name" required minlength="2" />
  </label>
  <div *ngIf="f.submitted && f.controls['name']?.invalid" class="error">
    Name is required (min 2 chars)
  </div>

  <label>
    Email
    <input name="email" [(ngModel)]="model.email" required email />
  </label>
  <div *ngIf="f.submitted && f.controls['email']?.invalid" class="error">
    Valid email is required
  </div>

  <label>
    Message
    <textarea name="message" [(ngModel)]="model.message" required></textarea>
  </label>
  <div *ngIf="f.submitted && f.controls['message']?.invalid" class="error">
    Message is required
  </div>

  <button type="submit">Send</button>
</form>
```

Notes:
- Uses `ngModel` for two-way binding.
- Validation via native attributes (`required`, `minlength`, `email`).

---

## Reactive Forms

Component (`signup.component.ts`):

```ts
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({ selector: 'app-signup', templateUrl: './signup.component.html' })
export class SignupComponent {
  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    agree: [false, [Validators.requiredTrue]]
  });

  submit() {
    if (this.form.valid) {
      console.log('Reactive Submit', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
```

Template (`signup.component.html`):

```html
<form [formGroup]="form" (ngSubmit)="submit()">
  <label>
    Username
    <input formControlName="username" />
  </label>
  <div *ngIf="form.get('username')?.touched && form.get('username')?.invalid" class="error">
    Username is required (min 3 chars)
  </div>

  <label>
    Email
    <input formControlName="email" />
  </label>
  <div *ngIf="form.get('email')?.touched && form.get('email')?.invalid" class="error">
    Valid email is required
  </div>

  <label>
    Password
    <input type="password" formControlName="password" />
  </label>
  <div *ngIf="form.get('password')?.touched && form.get('password')?.invalid" class="error">
    Password is required (min 6 chars)
  </div>

  <label>
    <input type="checkbox" formControlName="agree" /> I agree to terms
  </label>
  <div *ngIf="form.get('agree')?.touched && form.get('agree')?.invalid" class="error">
    You must agree before submitting
  </div>

  <button type="submit">Create Account</button>
</form>
```

Notes:
- Validation is configured in TypeScript with `Validators`.
- Use `markAllAsTouched()` to show errors after submit.

---

## Custom Validators (Reactive example)

```ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrength(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (!value) return null;
    const hasUpper = /[A-Z]/.test(value);
    const hasDigit = /\d/.test(value);
    return hasUpper && hasDigit ? null : { weakPassword: true };
  };
}
```

Usage:

```ts
password: ['', [Validators.required, Validators.minLength(6), passwordStrength()]]
```

---

## Quick Comparison

- Choose Template-driven for quick, simple forms.
- Choose Reactive for complex validation, dynamic forms, and testability.
- Both support validation; Reactive gives more control in code.


