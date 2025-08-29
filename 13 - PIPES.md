## Definitions

- **Pipe**: A simple function you can use in templates to transform values for display. Pipes are declared with `@Pipe` and used with the `|` symbol, like `{{ value | pipeName }}`.
- **Built-in Pipes**: Pipes that ship with Angular, e.g., `uppercase`, `lowercase`, `titlecase`, `date`, `currency`, `percent`, `slice`.
- **Custom Pipe**: Your own pipe for transforming data when the built-ins are not enough.

---

## 3.6 Angular Pipes (Filters in Angular)

Pipes format values in templates without changing the underlying data.

```html
<!-- Syntax -->
{{ expression | pipeName:arg1:arg2 }}
```

Multiple pipes can be chained:

```html
{{ user.name | titlecase | slice:0:10 }}
```

---

## 3.6.1 Built-in Pipes

Assume:

```ts
name = 'sana khan';
amount = 1234.5;
ratio = 0.3567; // 35.67%
today = new Date('2025-01-15T13:45:00Z');
items = ['Angular', 'React', 'Vue'];
```

### Text case pipes
```html
{{ name | uppercase }}   <!-- SANA KHAN -->
{{ name | lowercase }}   <!-- sana khan -->
{{ name | titlecase }}   <!-- Sana Khan -->
```

### Number formatting
```html
{{ amount | currency }}                <!-- $1,234.50 (based on locale) -->
{{ amount | currency:'EUR':'symbol' }} <!-- €1,234.50 -->
{{ ratio  | percent }}                 <!-- 35% -->
{{ ratio  | percent:'1.1-2' }}         <!-- 35.7% (minInt.minFrac-maxFrac) -->
```

### Date formatting
```html
{{ today | date }}              <!-- Jan 15, 2025 -->
{{ today | date:'short' }}      <!-- 1/15/25, 1:45 PM -->
{{ today | date:'MMM d, y, h:mm a' }}
```

### Slice (sub-array / substring)
```html
{{ name | slice:0:4 }}        <!-- Sana -->
<ul>
  <li *ngFor="let f of items | slice:0:2">{{ f }}</li> <!-- Angular, React -->
  
</ul>
```

Tip: For complex locale/format options, consult Angular’s Date/Number pipe docs.

---

## Creating a Custom Pipe

### Generate with CLI
```bash
ng g pipe pipes/initials
```

### Example: `initials` pipe
Turns a full name into capitalized initials (e.g., "sana khan" → "SK").

`src/app/pipes/initials.pipe.ts`

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'initials' })
export class InitialsPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return value
      .trim()
      .split(/\s+/)
      .map(part => part.charAt(0).toUpperCase())
      .join('');
  }
}
```

Usage in a template:

```html
{{ 'sana khan' | initials }}  <!-- SK -->
```

### Pipe with arguments
Add parameters for flexible transformations.

```ts
@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(text: string, limit = 20, ellipsis = '…'): string {
    if (!text) return '';
    return text.length > limit ? text.slice(0, limit) + ellipsis : text;
  }
}
```

```html
{{ 'This is a long sentence' | truncate:10:'...' }}  <!-- This is a ... -->
```

---

## Best Practices
- Prefer built-in pipes when possible.
- Keep pipes pure (no side effects). For expensive or async work, consider `AsyncPipe` or services.
- Avoid heavy computation in pipes that run on every change detection unless memoized/cached.
- For localization, configure the app locale so `currency`, `date`, and `percent` display correctly.


