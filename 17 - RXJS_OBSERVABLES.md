## Definitions

- **Observable**: A lazy stream of values over time. Consumers subscribe to receive values (`next`), errors, and completion.
- **Observer**: The receiver with `next`, `error`, and `complete` handlers.
- **Operator**: A function that transforms an observable (e.g., `map`, `filter`, `switchMap`).
- **Subject**: An observable + observer in one; you can manually `next()` values. Variants: `Subject`, `BehaviorSubject`, `ReplaySubject`.
- **Cold vs Hot**: Cold observables start producing values on subscription; hot observables produce values regardless of subscribers.

---

## Creating and Subscribing to Observables

```ts
import { Observable } from 'rxjs';

const number$ = new Observable<number>((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.complete();
});

number$.subscribe({
  next: (v) => console.log('value', v),
  error: (e) => console.error('error', e),
  complete: () => console.log('done'),
});
```

Helpers:

```ts
import { of, from, interval, fromEvent } from 'rxjs';

of(1, 2, 3).subscribe();
from([10, 20]).subscribe();
interval(1000).subscribe(); // emits 0,1,2... every second
fromEvent(document, 'click').subscribe();
```

---

## Common Operators

```ts
import { map, filter, take, debounceTime, switchMap, mergeMap, concatMap, catchError, of } from 'rxjs';

interval(300)
  .pipe(
    map((i) => i * 2),
    filter((i) => i % 3 === 0),
    take(5)
  )
  .subscribe(console.log);

// Typeahead example (switch to latest request)
searchTerm$
  .pipe(
    debounceTime(300),
    switchMap((term) => httpSearch(term).pipe(catchError(() => of([]))))
  )
  .subscribe(results => console.log(results));
```

Guidance:
- `switchMap`: cancel previous, keep latest (typeahead, live search).
- `mergeMap`: run all in parallel (fire-and-forget, WebSocket fan-out).
- `concatMap`: queue sequentially (preserve order).

---

## Subjects

```ts
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

const s$ = new Subject<number>();
s$.subscribe(v => console.log('A', v));
s$.next(1);
s$.next(2);

const b$ = new BehaviorSubject(0); // requires an initial value, replays latest
b$.subscribe(v => console.log('B1', v)); // 0 immediately
b$.next(10);
b$.subscribe(v => console.log('B2', v)); // 10 immediately

const r$ = new ReplaySubject(2); // replays last 2 values to new subscribers
r$.next('x'); r$.next('y'); r$.next('z');
r$.subscribe(v => console.log('R', v)); // y, z
```

Use cases:
- `Subject`: manual event bus.
- `BehaviorSubject`: store latest state (good for simple state stores).
- `ReplaySubject`: late subscribers need history.

---

## Angular + Observables

### HttpClient returns Observables

```ts
http.get<User[]>('/api/users').subscribe({ next: users => this.users = users });
```

### AsyncPipe (auto-subscribe/unsubscribe in templates)

```ts
users$ = this.http.get<User[]>('/api/users');
```
```html
<ul>
  <li *ngFor="let u of users$ | async">{{ u.name }}</li>
</ul>
```

### Unsubscribing patterns

```ts
import { Subject, takeUntil } from 'rxjs';

private destroy$ = new Subject<void>();

ngOnInit() {
  this.stream$.pipe(takeUntil(this.destroy$)).subscribe();
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

Prefer `AsyncPipe` in templates to avoid manual unsubscribe when possible.

---

## Error Handling and Retry

```ts
import { retry, catchError, throwError } from 'rxjs';

api$()
  .pipe(
    retry(2),
    catchError(err => {
      console.error('API failed', err);
      return throwError(() => err);
    })
  )
  .subscribe();
```

---

## Mini Exercises
- Create a button stream with `fromEvent` and count clicks with `scan`.
- Build a typeahead using `debounceTime` + `switchMap` to an HTTP endpoint.
- Convert a promise to an observable with `from(promise)` and display via `AsyncPipe`.


