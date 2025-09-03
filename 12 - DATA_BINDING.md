## Definitions

- **Data Binding**: The mechanism that coordinates data between the component class (TypeScript) and the template (HTML).
- **Interpolation**: One-way binding from class → template using `{{ ... }}` to display values.
- **Property Binding**: One-way binding from class → template element/property using `[prop]="..."`.
- **Event Binding**: One-way binding from template → class using `(event)="handler(...)"`.
- **Two-way Binding**: Syncs class ↔ template using `[(ngModel)]` (from `FormsModule`).

---

## 3.5.1 Angular Data Binding (Overview)

Data flows between your component class and template in four primary ways:

```
Component (TS) ──> Template (HTML)
  • Interpolation:       {{ expression }}
  • Property binding:    [prop]="expression"

Template (HTML) ──> Component (TS)
  • Event binding:       (event)="handler($event)"

Both directions (sync)
  • Two-way binding:     [(ngModel)]="property"
```

Use: choose the simplest binding that matches the direction your data needs to move.

---

## 3.5.2 Interpolation, Property Binding, Event Binding, Two-way Binding

### Setup for examples
If you plan to use two-way binding with `[(ngModel)]`, import `FormsModule` in your app (standalone or module).

Standalone `App` (example):

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(FormsModule)]
});
```

NgModule-based apps:

```ts
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule],
})
export class AppModule {}
```

---

### Interpolation (class → template)

Component (`example.component.ts`):

```ts
import { Component } from '@angular/core';

@Component({ selector: 'app-example', templateUrl: './example.component.html' })
export class ExampleComponent {
  userName = 'Sana';
  unread = 3;
}
```

Template (`example.component.html`):

```html
<h3>Good Morning, {{ userName }}</h3>
<p>You have {{ unread }} unread messages.</p>
```

---

### Property Binding (class → template element/property)

```ts
imageUrl = 'assets/angular-logo.png';
isDisabled = true;
```

```html
<img [src]="imageUrl" [alt]="'Angular Logo'" />
<button [disabled]="isDisabled">Save</button>
```

Use property binding for any DOM, component, or directive input property.

---

### Event Binding (template → class)

```ts
count = 0;
onIncrement(step: number) { this.count += step; }
```

```html
<button (click)="onIncrement(1)">+1</button>
<span>Count: {{ count }}</span>
```

---

### Two-way Binding with `[(ngModel)]` (sync both ways)

```ts
favoriteMovie = '';
```

```html
<input [(ngModel)]="favoriteMovie" placeholder="Your favorite movie" />
<p>You typed: {{ favoriteMovie }}</p>
```

Note: `[(ngModel)]` requires importing `FormsModule` (see setup above).

---

## Mini Exercise
- Add an input for `firstName` with `[(ngModel)]` and show `Hello, {{ firstName }}`.
- Add a button that calls `(click)` to increase a `likes` counter with interpolation display.
- Disable a submit button with `[disabled]` when `firstName` is empty.
