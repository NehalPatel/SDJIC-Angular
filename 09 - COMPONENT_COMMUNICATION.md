## Definitions

- **Component Communication**: The patterns and APIs used for passing data and events between Angular components (typically parent ↔ child).
- **Input**: A property on a child component that the parent can bind data to using property binding `[prop]="..."`.
- **Output**: An event emitter on a child component that the parent can listen to using event binding `(event)="..."`.
- **EventEmitter**: A utility class used with `@Output()` to emit custom events from a child component to its parent.

---

## Parent → Child with `@Input()`

Child component (`child.ts`):

```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  templateUrl: './child.html',
})
export class ChildComponent {
  @Input() title = 'Default Title';
  @Input() count = 0;
}
```

Child template (`child.html`):

```html
<h3>{{ title }}</h3>
<p>Count from parent: {{ count }}</p>
```

Parent template (`parent.html`):

```html
<app-child [title]="parentTitle" [count]="items.length"></app-child>
```

---

## Child → Parent with `@Output()` and `EventEmitter`

Child component (`counter.ts`):

```ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.html',
})
export class CounterComponent {
  value = 0;

  @Output() valueChange = new EventEmitter<number>();

  inc() {
    this.value++;
    this.valueChange.emit(this.value);
  }

  dec() {
    this.value--;
    this.valueChange.emit(this.value);
  }
}
```

Child template (`counter.html`):

```html
<button (click)="dec()">-</button>
<strong>{{ value }}</strong>
<button (click)="inc()">+</button>
```

Parent template (`parent.html`):

```html
<app-counter (valueChange)="onCounterChanged($event)"></app-counter>
<p>Latest value from child: {{ latest }}</p>
```

Parent class (`parent.ts`):

```ts
import { Component } from '@angular/core';

@Component({ selector: 'app-parent', templateUrl: './parent.html', standalone: true })
export class ParentComponent {
  latest = 0;
  onCounterChanged(val: number) {
    this.latest = val;
  }
}
```

---

## Two-way binding pattern with `@Input()` + `@Output()`

Child supports the `[(value)]` banana-in-a-box syntax by exposing `@Input() value` and `@Output() valueChange`:

```ts
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({ selector: 'app-rating', templateUrl: './rating.html', standalone: true })
export class RatingComponent {
  @Input() value = 0;
  @Output() valueChange = new EventEmitter<number>();

  set(v: number) {
    this.value = v;
    this.valueChange.emit(this.value);
  }
}
```

Parent template:

```html
<app-rating [(value)]="rating"></app-rating>
```

---

## Tips and Best Practices

- Keep Inputs simple and well-named; prefer immutable inputs when possible.
- Emit Outputs only when state changes; avoid emitting the same value repeatedly.
- Avoid tightly coupling parent and child; prefer passing minimal required data.
- Consider shared services for sibling communication or complex flows.


