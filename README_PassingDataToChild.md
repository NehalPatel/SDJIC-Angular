# Passing Data to a Child Component in Angular

This guide demonstrates how to pass a message (e.g., username) from the App component to the Header component in Angular. We'll first use a static string, then use a signal variable.

---

## 1️⃣ Step 1: Setup Components

Assume you have `AppComponent` and `HeaderComponent` already generated.

---

## 2️⃣ Step 2: Pass Static String to Child

### a. Define Input in Header Component

Open `header.component.ts` and add an `@Input()` property:

```typescript
// ...existing code...
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  // ...existing code...
})
export class HeaderComponent {
  @Input() username: string = '';
  // ...existing code...
}
```

### b. Use the Input in Header Template

Open `header.component.html` and display the username:

```html
<!-- ...existing code... -->
<header>
  <h1>Welcome, {{ username }}</h1>
</header>
<!-- ...existing code... -->
```

### c. Pass Static String from App Component

Open `app.component.html` and bind the static string:

```html
<!-- ...existing code... -->
<app-header [username]="'Devashya Patel'"></app-header>
<!-- ...existing code... -->
```

---

## 3️⃣ Step 3: Pass Signal Variable to Child

### a. Define Signal Variable in App Component

Open `app.component.ts` and define a signal (Angular 16+):

```typescript
// ...existing code...
import { signal } from '@angular/core';

export class AppComponent {
  username = signal('Dev Patel');
  // ...existing code...
}
```

### b. Bind Signal Value to Child

Update `app.component.html` to pass the signal's value:

```html
<!-- ...existing code... -->
<app-header [username]="username()"></app-header>
<!-- ...existing code... -->
```

---

## ℹ️ Alternative: Using `input()` Signal Helper (Angular 17+)

Instead of using the `@Input()` decorator, you can use the `input()` signal helper in the child component:

```typescript
// ...existing code...
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  // ...existing code...
})
export class HeaderComponent {
  username = input('username');
  // ...existing code...
}
```

In the template, use `username()` to access the value:

```html
<!-- ...existing code... -->
<header>
  <h1>Welcome, {{ username() }}</h1>
</header>
<!-- ...existing code... -->
```

The parent binding remains the same:

```html
<app-header [username]="username()"></app-header>
```

---

## 4️⃣ Step 4: Run and Test

Start the Angular app:

```bash
ng serve
```

You should see the username displayed in the header, first as a static string, then as a signal variable.

---

## ✅ Summary

- Use `@Input()` in the child component to receive data.
- Pass data from the parent using property binding.
- For signals, pass the value using `signalVar()`.

---