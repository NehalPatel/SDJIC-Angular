## Definitions

- **Service**: A reusable class for data access, business logic, or shared state. Marked with `@Injectable()` so Angular can create and inject it.
- **Dependency Injection (DI)**: Angular's way to supply a class with its dependencies, e.g., injecting a service into a component.
- **HttpClient**: Angular's HTTP API for calling REST endpoints (GET/POST/PUT/DELETE), returning RxJS `Observable`s.

---

## 1) Create a Service with Angular CLI

```bash
ng g service services/users
```

This generates `src/app/services/users.service.ts` with `@Injectable({ providedIn: 'root' })`, making it an app-wide singleton and tree-shakable.

`src/app/services/users.service.ts`

```ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UsersService {
  // Add HTTP calls here in the next step
}
```

---

## 2) Enable HttpClient

Standalone apps (example):

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(HttpClientModule)]
});
```

NgModule apps:

```ts
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, HttpClientModule]
})
export class AppModule {}
```

---

## 3) Use HttpClient in a Service (GET/POST)

`src/app/services/users.service.ts`

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User { id: number; name: string; email: string; }

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly api = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.api, user);
  }
}
```

---

## 4) Inject the Service into a Component

Constructor injection:

```ts
import { Component, OnInit } from '@angular/core';
import { UsersService, User } from '../services/users.service';

@Component({ selector: 'app-users', templateUrl: './users.component.html' })
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading = false;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.loading = true;
    this.usersService.getUsers().subscribe({
      next: (data) => { this.users = data; },
      error: (err) => { console.error('Failed to load users', err); },
      complete: () => { this.loading = false; }
    });
  }
}
```

Template:

```html
<button (click)="fetch()" [disabled]="loading">Reload</button>
<p *ngIf="loading">Loading...</p>
<ul>
  <li *ngFor="let u of users">{{ u.name }} • {{ u.email }}</li>
  
</ul>
```

Alternative using `inject()` (no constructor):

```ts
import { Component, computed, inject, signal } from '@angular/core';
import { UsersService, User } from '../services/users.service';

@Component({ selector: 'app-users-signal', template: `
  <button (click)="fetch()" [disabled]="loading()">Reload</button>
  <p *ngIf="loading()">Loading...</p>
  <ul><li *ngFor="let u of users()">{{ u.name }}</li></ul>
`})
export class UsersSignalComponent {
  private usersService = inject(UsersService);
  users = signal<User[]>([]);
  loading = signal(false);

  fetch() {
    this.loading.set(true);
    this.usersService.getUsers().subscribe({
      next: (data) => this.users.set(data),
      error: (e) => console.error(e),
      complete: () => this.loading.set(false)
    });
  }
}
```

---

## 5) Error Handling and Retry (RxJS)

```ts
import { catchError, retry, throwError } from 'rxjs';

getUsers() {
  return this.http.get<User[]>(this.api).pipe(
    retry(1),
    catchError((err) => {
      console.error('Users API error', err);
      return throwError(() => err);
    })
  );
}
```

---

## 6) Common Extras

- Set a base API URL via environment files.
- Use an HTTP interceptor for auth tokens and logging.
- Prefer strong typings for responses.
- Unsubscribe where appropriate (e.g., on long-lived subscriptions) or use `async` pipe in templates.


