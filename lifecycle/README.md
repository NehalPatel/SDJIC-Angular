# Angular Core Features: Components & Lifecycle Hooks

## 3.3.1 Angular Components
Angular components are the fundamental building blocks of an Angular application. Each component controls a patch of screen called a view. Components are defined using the `@Component` decorator.

### Creating a Component
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `<h1>Hello, Angular!</h1>`
})
export class ExampleComponent {}
```

## 3.3.2 Component Lifecycle Hooks
Angular provides lifecycle hooks that allow you to tap into key moments in a component's existence:

| Hook              | Purpose                                                      |
|-------------------|--------------------------------------------------------------|
| `constructor`     | Class instantiation, dependency injection                    |
| `ngOnChanges`     | Called when input properties change                          |
| `ngOnInit`        | Called once after first `ngOnChanges`                        |
| `ngDoCheck`       | Custom change detection                                      |
| `ngAfterContentInit` | Called after content (ng-content) is projected            |
| `ngAfterContentChecked` | After every check of projected content                 |
| `ngAfterViewInit` | Called after component's view (and child views) initialized  |
| `ngAfterViewChecked` | After every check of the component's views                |
| `ngOnDestroy`     | Just before Angular destroys the component                   |

### Example Usage
Lifecycle hooks are implemented as class methods:
```ts
export class DemoComponent implements OnInit, OnDestroy {
  ngOnInit() {
    // Initialization logic
  }
  ngOnDestroy() {
    // Cleanup logic
  }
}
```

---

## Practical Example
See `src/app/lifecycle-demo.component.ts` for a full example using all lifecycle hooks in Angular 17+.
