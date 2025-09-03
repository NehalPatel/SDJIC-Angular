## Routing and Navigation — Quick Start (Simple)

Set up basic routing with a few pages and a simple layout. No params, no lazy loading.

### 1) Create a new Angular project
```bash
ng new routing-demo
cd routing-demo
```

### 2) Generate pages (standalone components)
```bash
ng g c pages/home
ng g c pages/about
ng g c pages/contact
ng g c pages/services
```

### 2.1) Add basic HTML to each page
Edit the generated templates, e.g.:
```html
<!-- src/app/pages/home/home.component.html -->
<h2>Home</h2>
<p>Welcome to the Home page.</p>
```
```html
<!-- src/app/pages/about/about.component.html -->
<h2>About</h2>
<p>About our app.</p>
```
```html
<!-- src/app/pages/contact/contact.component.html -->
<h2>Contact</h2>
<p>Contact us page.</p>
```
```html
<!-- src/app/pages/services/services.component.html -->
<h2>Services</h2>
<p>Our services.</p>
```

### 3) Add routes in `src/app/app.routes.ts`
```ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ServicesComponent } from './pages/services/services.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServicesComponent },
  // If no route matches, redirect to Home
  { path: '**', redirectTo: '' },
];
```

### 4) Add layout components (Header, Menu, Footer)
```bash
ng g c layout/header
ng g c layout/menu
ng g c layout/footer
```
Add simple HTML:
```html
<!-- src/app/layout/header/header.component.html -->
<header>
  <h1>My App</h1>
</header>
```
```html
<!-- src/app/layout/menu/menu.component.html -->
<nav>
  <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
  <a routerLink="/about" routerLinkActive="active">About</a>
  <a routerLink="/contact" routerLinkActive="active">Contact</a>
  <a routerLink="/services" routerLinkActive="active">Services</a>
</nav>
```
```html
<!-- src/app/layout/footer/footer.component.html -->
<footer>
  <small>© 2025 My App</small>
</footer>
```

### 5) Wire up AppComponent with router-outlet and layout
Import router directives and layout components into the root component.
```ts
// src/app/app.component.ts (or src/app/app.ts in some setups)
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { MenuComponent } from './layout/menu/menu.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, HeaderComponent, MenuComponent, FooterComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}
```
```html
<!-- src/app/app.component.html (or src/app/app.html) -->
<app-header></app-header>
<app-menu></app-menu>
<main style="display:block; margin-top:1rem;">
  <router-outlet></router-outlet>
</main>
<app-footer></app-footer>
```

That’s it. Run the app:
```bash
ng serve
```
You now have a simple layout with Header, Menu, Footer, and navigation between Home, About, Contact, and Services. Unmatched routes will redirect to Home.
