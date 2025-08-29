## Definitions

- **Service**: A reusable class that encapsulates focused logic or state (e.g., data access, business rules, utilities). Services are typically marked with `@Injectable()` so Angular can create and inject them where needed.
- **Dependency Injection (DI)**: A design pattern where an external system (Angular's injector) supplies an object's dependencies instead of the object creating them itself. This improves modularity, testability, and reuse. In Angular, you declare dependencies (e.g., services) in constructors or via `inject()`, and the injector provides instances based on configured providers.

## Movie Subscription App — Step 1: Project and Basic Components

This step guides students to create a new Angular project for a Movie Subscription app, then build two independent components (`Header` and `Menu`) each with its own Subscribe button and click handler.

### 1) Create a new Angular project

```bash
ng new movie-subscription
cd movie-subscription
```

- **--standalone**: use Angular standalone APIs (no NgModules).
- **--routing**: scaffold routing.
- **--style=css**: use CSS stylesheets.

Start the dev server:

```bash
ng serve -o
```

### 2) Generate Header and Menu components

```bash
ng g component components/header
ng g component components/menu
```

This creates `header` and `menu` with external `html`/`css` files.

### 3) Add Subscribe button in each component with its own handler

Header component template (`components/header/header.html`):

```html
<header class="header">
  <h1>Movie Subscription</h1>
  <button (click)="onSubscribeHeader()">Subscribe</button>
  <p class="muted">Header subscribe clicks: {{ headerClicks }}</p>
  <hr />
</header>
```

Header component class (`components/header/header.ts`):

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  headerClicks = 0;
  onSubscribeHeader() {
    this.headerClicks++;
    console.log('Header Subscribe clicked', this.headerClicks);
  }
}
```

Menu component template (`components/menu/menu.html`):

```html
<nav class="menu">
  <a href="#">Home</a>
  <a href="#">Movies</a>
  <a href="#">Plans</a>
  <button (click)="onSubscribeMenu()">Subscribe</button>
  <p class="muted">Menu subscribe clicks: {{ menuClicks }}</p>
  <hr />
 </nav>
```

Menu component class (`components/menu/menu.ts`):

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  menuClicks = 0;
  onSubscribeMenu() {
    this.menuClicks++;
    console.log('Menu Subscribe clicked', this.menuClicks);
  }
}
```

### 4) Render both components in the root template

Open `src/app/app.html` and insert the selectors:

```html
<app-header></app-header>
<app-menu></app-menu>
<router-outlet></router-outlet>
```

If using standalone `App` with imports, ensure both components are imported in `app.ts` (or route-level where they are used).

Next step (coming up): extract shared logic into a service and inject it into both components so they can share functionality while remaining independent.

## Step 2) Generate a Service (latest Angular CLI) and add subscribe()

Use Angular CLI to generate a service. This creates `subscription.service.ts` with `@Injectable({ providedIn: 'root' })` so it is app-wide and tree-shakable.

```bash
ng g service services/subscription
```

This will create `src/app/services/subscription.service.ts`.

Open the service and add a `subscribe()` function:

```ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  
  subscribe(plan) {
    console.log(`Subscribed to ${plan}`);
  }

}
```

Next: inject `SubscriptionService` into both `Header` and `Menu` and call `subscribe()` from their own click handlers.

## Step 3) Use the service in components — replace button clicks

Inject `SubscriptionService` into both components and make the Subscribe button call the service directly.

### Header component

Header class (`components/header/header.ts`):

```ts
import { Component } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor(public subscriptionService: SubscriptionService) {}
}
```

Header template (`components/header/header.html`):

```html
<header class="header">
  <h1>Movie Subscription</h1>
  <button (click)="subscriptionService.subscribe('premium')">Subscribe</button>
  <hr />
</header>
```

### Menu component

Menu class (`components/menu/menu.ts`):

```ts
import { Component } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  constructor(public subscriptionService: SubscriptionService) {}
}
```

Menu template (`components/menu/menu.html`):

```html
<nav class="menu">
  <a href="#">Home</a>
  <a href="#">Movies</a>
  <a href="#">Plans</a>
  <button (click)="subscriptionService.subscribe('basic')">Subscribe</button>
  <hr />
</nav>
```

Notes:
- We expose the service as `public` in the constructor to access it in the template.
- You can pass different plan names from each component if desired.


