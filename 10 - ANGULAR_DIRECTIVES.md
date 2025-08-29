## Definitions

- **Directive**: A class that adds behavior to elements in Angular templates.
- **Structural Directive**: Changes the DOM layout by adding/removing elements (prefixed with `*`). Examples: `*ngIf`, `*ngFor`, `*ngSwitchCase`.
- **Attribute Directive**: Changes the appearance/behavior of an existing element. Examples: `ngClass`, `ngStyle`.

---

## 3.4.1 Structural Directives: `*ngIf`, `*ngFor`, `*ngSwitch`

### `*ngIf`
```html
<button (click)="show = !show">Toggle</button>
<p *ngIf="show">Now you see me</p>
<p *ngIf="!show">Now you don't</p>
```

### `*ngFor`
```ts
items = ['Angular', 'React', 'Vue'];
```
```html
<ul>
  <li *ngFor="let item of items; index as i">{{ i + 1 }}. {{ item }}</li>
  <li *ngFor="let item of items; trackBy: trackByIndex">{{ item }}</li>
  <!-- Optional trackBy to optimize rendering -->
</ul>
```
```ts
trackByIndex(index: number) { return index; }
```

### `*ngSwitch`
```ts
role = 'admin'; // 'guest' | 'member' | 'admin'
```
```html
<div [ngSwitch]="role">
  <p *ngSwitchCase="'guest'">Welcome, Guest</p>
  <p *ngSwitchCase="'member'">Welcome, Member</p>
  <p *ngSwitchCase="'admin'">Welcome, Admin</p>
  <p *ngSwitchDefault>Unknown role</p>
  
</div>
```

---

## 3.4.2 Attribute Directives: `ngClass`, `ngStyle`

### `ngClass`
```ts
isActive = true;
isWarning = false;
```
```html
<div [ngClass]="{ active: isActive, warning: isWarning }">Status</div>
<div [class.active]="isActive" [class.warning]="isWarning">Status (alt)</div>
```
```css
.active { color: #16a34a; }
.warning { color: #ca8a04; }
```

### `ngStyle`
```ts
progress = 65;
color = '#2563eb';
```
```html
<div [ngStyle]="{ width: progress + '%', background: color, height: '8px' }"></div>
```

---

## Tips
- Prefer `*ngIf; else` for clear alternate content.
- Use `trackBy` with `*ngFor` for large lists.
- `ngClass` and `ngStyle` accept objects, arrays, or strings; pick the clearest form.


